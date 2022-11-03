const mysql = require("mysql");
const bcrypt = require("bcrypt");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "consultoria_db",
});


exports.getEncuentro = (req, res, next) => {
  let { id } = req.params;
  req.body.encuentro = {
    datos: "",
    epp: "",
    equipos: "",
    parametro: "",
    actividad: "",
  };
  pool.query(
    "SELECT * FROM proceso_encuentro WHERE Id_cta = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      if (!results.length > 0)
        return res
          .status(404)
          .send({ success: false, body: { message: "No encontrado" } });
      req.body.encuentro.datos = results[0];
      req.body.Id_pro_enc = results[0].Id_pro_enc;
      next();
    }
  );
};

exports.getEpps = (req, res, next) => {
  pool.query(
    "SELECT * FROM pe_epp WHERE Id_pro_enc = ?",
    [req.body.Id_pro_enc],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.encuentro.epp = results.length > 0 ? results : [];
      next();
    }
  );
}

exports.getEquipos = (req, res, next) => {
  pool.query(
    "SELECT * FROM pe_equipo WHERE Id_pro_enc = ?",
    [req.body.Id_pro_enc],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.encuentro.equipos = results.length > 0 ? results : [];
      next();
    }
  );
}

exports.getParametros = (req, res, next) => {
  pool.query(
    "SELECT * FROM pe_parametro_control WHERE Id_pro_enc = ?",
    [req.body.Id_pro_enc],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.encuentro.parametro = results.length > 0 ? results : [];
      next();
    }
  );
}


exports.getActividades = (req, res) => {
  pool.query(
    "SELECT * FROM pe_actividad WHERE Id_pro_enc = ?",
    [req.body.Id_pro_enc],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.encuentro.actividad = results.length > 0 ? results : [];
      return res.status(200).send({success: true, body: req.body.encuentro});
    }
  );
}



exports.create = (req, res, next) => {
  let { Descripcion_pro_enc, Personal_pro_enc, Observaciones_pro_enc, Id_cta } =
    req.body.datos;
  pool.query(
    "INSERT INTO proceso_encuentro(Descripcion_pro_enc,Personal_pro_enc,Observaciones_pro_enc,Id_cta) VALUES (?,?,?,?)",
    [Descripcion_pro_enc, Personal_pro_enc, Observaciones_pro_enc, Id_cta],
    (err, results) => {
      if (err) return res.status(500).send({ success: false, body: err });
      req.body.relation = results.insertId;
      req.body.result = [{ title: "Resultado insertar proceso", results }];
      next();
    }
  );
};

exports.insertEpp = (req, res, next) => {
  let epp = req.body.epp;
  for (let index = 0; index < epp.length; index++) {
    epp[index].push(req.body.relation);
  }
  for (let index = 0; index < epp.length; index++) {
    pool.query(
      "INSERT INTO pe_epp(Elemento_epp,Descripcion_epp,Id_pro_enc) VALUES (?,?,?)",
      epp[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({ title: "Resultado insertar epp(s)", results });
      }
    );
  }
  next();
};

exports.insertEquipo = (req, res, next) => {
  let equipo = req.body.equipo;
  for (let index = 0; index < equipo.length; index++) {
    equipo[index].push(req.body.relation);
  }
  for (let index = 0; index < equipo.length; index++) {
    pool.query(
      "INSERT INTO pe_equipo(Nombre_equipo,Descripcion_equipo,Id_pro_enc) VALUES (?,?,?)",
      equipo[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({
          title: "Resultado insertar equipo(s)",
          results,
        });
      }
    );
  }
  next();
};

exports.insertParametro = (req, res, next) => {
  let parametro = req.body.parametro;
  for (let index = 0; index < parametro.length; index++) {
    parametro[index].push(req.body.relation);
  }
  for (let index = 0; index < parametro.length; index++) {
    pool.query(
      "INSERT INTO pe_parametro_control(Descripcion_param,Id_pro_enc) VALUES (?,?)",
      parametro[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({
          title: "Resultado insertar parametro(s)",
          results,
        });
      }
    );
  }
  next();
};

exports.insertActividad = (req, res, next) => {
  let actividad = req.body.actividad;
  for (let index = 0; index < actividad.length; index++) {
    actividad[index].push(req.body.relation);
  }
  for (let index = 0; index < actividad.length; index++) {
    pool.query(
      "INSERT INTO pe_actividad(Nombre_act,Descripcion_act,Calidad_act,Seguridad_act,Ambiente_act,Id_pro_enc) VALUES (?,?,?,?,?,?)",
      actividad[index],
      (err, results) => {
        if (err) return res.status(500).send({ success: false, body: err });
        req.body.result.push({
          title: "Resultado insertar actividad(es)",
          results,
        });
      }
    );
  }
  return res.status(201).send({ success: true, body: req.body.result });
};
