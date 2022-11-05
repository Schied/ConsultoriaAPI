const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "consultoria_db",
});


exports.getDesarrollo = (req, res, next) => {
  let { id } = req.params;
  req.body.desarrollo = {
    datos: "",
    aliados: "",
    impacto: ""
  };
  pool.query(
    "SELECT * FROM proceso_desarrollo WHERE Id_cta = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      if (!results.length > 0)
        return res
          .status(404)
          .send({ success: false, body: { message: "No encontrado" } });
      req.body.desarrollo.datos = results[0];
      req.body.Id_pro_des = results[0].Id_pro_des;
      next();
    }
  );
};

exports.getAliados = (req, res, next) => {
  pool.query(
    "SELECT * FROM pd_gestion_aliados WHERE Id_pro_des = ?",
    [req.body.Id_pro_des],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.desarrollo.aliados = results.length > 0 ? results : [];
      next();
    }
  );
}

exports.getImpactos = (req, res, next) => {
  pool.query(
    "SELECT * FROM pd_eval_impacto WHERE Id_pro_des = ?",
    [req.body.Id_pro_des],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.desarrollo.impacto = results.length > 0 ? results : [];
      return res.status(200).send({success: true, body: req.body.desarrollo});
    }
  );
}


exports.create = (req, res, next) => {
  let { Nombre_micro_emp, Sector_emp, Area, Programa_academico, Coord_social, Id_cta } =
    req.body.datos;
    pool.query('SELECT * FROM consulta WHERE Id_cta = ?', [Id_cta], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        if(results[0].Fase_cta!=2) return res.status(404).send({success: false, body: {message:  'No se encuentra en la fase valida'}})
        pool.query(
            "INSERT INTO proceso_desarrollo(Nombre_micro_emp,Sector_emp,Area,Programa_academico,Coord_social,Id_cta) VALUES (?,?,?,?,?,?)",
            [Nombre_micro_emp, Sector_emp, Area, Programa_academico, Coord_social, Id_cta],
            (err, results) => {
              if (err) return res.status(500).send({ success: false, body: err });
              req.body.relation = results.insertId;
              req.body.result = [{ title: "Resultado insertar proceso", results }];
              next();
            }
          );
    });
  
};

exports.insertAliado = (req, res, next) => {
  let aliados = req.body.aliados;
  for (let index = 0; index < aliados.length; index++) {
    aliados[index].push(req.body.relation);
  }
  for (let index = 0; index < aliados.length; index++) {
    pool.query(
      "INSERT INTO pd_gestion_aliados(Nombre_cont,Cargo_ges,Correo_ges,Celular_ges,Descripcion_ges,Valor_ges,Id_pro_des) VALUES (?,?,?,?,?,?,?)",
      aliados[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({ title: "Resultado insertar aliado(s)", results });
      }
    );
  }
  next();
};

exports.insertImpacto = (req, res) => {
  let impacto = req.body.impacto;
  for (let index = 0; index < impacto.length; index++) {
    impacto[index].push(req.body.relation);
  }
  for (let index = 0; index < impacto.length; index++) {
    pool.query(
      "INSERT INTO pd_eval_impacto(Cal_cuantitativa_eval,Cal_cualitativa_eval,Aspectos_eval,Id_pro_des) VALUES (?,?,?,?)",
      impacto[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({
          title: "Resultado insertar impacto(s)",
          results,
        });
      }
    );
  }
  return res.status(201).send({ success: true, body: req.body.result });
};
