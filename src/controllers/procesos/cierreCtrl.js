const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "consultoria_db",
});


exports.getCierre = (req, res, next) => {
  let { id } = req.params;
  req.body.cierre = {
    datos: "",
    revision: "",
    fase: ""
  };
  pool.query(
    "SELECT * FROM proceso_cierre WHERE Id_cta = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      if (!results.length > 0)
        return res
          .status(404)
          .send({ success: false, body: { message: "No encontrado" } });
      req.body.cierre.datos = results[0];
      req.body.Id_pro_cierre = results[0].Id_pro_cierre;
      next();
    }
  );
};

exports.getRevision = (req, res, next) => {
  pool.query(
    "SELECT * FROM pc_revision WHERE Id_pro_cierre = ?",
    [req.body.Id_pro_cierre],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.cierre.revision = results.length > 0 ? results : [];
      next();
    }
  );
}

exports.getFase = (req, res, next) => {
  pool.query(
    "SELECT * FROM pc_fase WHERE Id_pro_cierre = ?",
    [req.body.Id_pro_cierre],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.cierre.fase = results.length > 0 ? results : [];
      return res.status(200).send({success: true, body: req.body.cierre});
    }
  );
}


exports.create = (req, res, next) => {
  let { Nombre_pro_cierre, Plazo_pro_cierre, Elemento_pro_cierre, Comentario_pro_cierre, Id_cta } =
    req.body.datos;
    pool.query('SELECT * FROM consulta WHERE Id_cta = ?', [Id_cta], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        if(results[0].Fase_cta!=3) return res.status(404).send({success: false, body: {message:  'No se encuentra en la fase valida'}})
        pool.query(
            "INSERT INTO proceso_cierre(Nombre_pro_cierre, Plazo_pro_cierre, Elemento_pro_cierre, Comentario_pro_cierre, Id_cta) VALUES (?,?,?,?,?)",
            [ Nombre_pro_cierre, Plazo_pro_cierre, Elemento_pro_cierre, Comentario_pro_cierre, Id_cta],
            (err, results) => {
              if (err) return res.status(500).send({ success: false, body: err });
              req.body.relation = results.insertId;
              req.body.result = [{ title: "Resultado insertar proceso", results }];
              next();
            }
          );
    });
  
};

exports.insertRevision = (req, res, next) => {
  let { Definicion_rev, Objetivo_gen_rev, Objetivo_esp_a, Objetivo_esp_b, Objetivo_esp_c, Objetivo_esp_d, Objetivo_esp_e } = req.body.revision;
  pool.query(
    "INSERT INTO pc_revision(Definicion_rev, Objetivo_gen_rev, Objetivo_esp_a, Objetivo_esp_b, Objetivo_esp_c, Objetivo_esp_d, Objetivo_esp_e, Id_pro_cierre) VALUES (?,?,?,?,?,?,?,?)",
    [ Definicion_rev, Objetivo_gen_rev, Objetivo_esp_a, Objetivo_esp_b, Objetivo_esp_c, Objetivo_esp_d, Objetivo_esp_e, req.body.relation],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      next();
    }
  );
};

exports.insertFase = (req, res) => {
  let fase = req.body.fase;
  for (let index = 0; index < fase.length; index++) {
    fase[index].push(req.body.relation);
  }
  for (let index = 0; index < fase.length; index++) {
    pool.query(
      "INSERT INTO pc_fase(Descripcion_fase, Evidencia_fase, Avance_fase, Id_pro_cierre) VALUES (?,?,?,?)",
      fase[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({
          title: "Resultado insertar fase(s)",
          results,
        });
      }
    );
  }
  return res.status(201).send({ success: true, body: req.body.result });
};
