const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getEncuentros = (req, res) => {
    pool.query('SELECT * FROM proceso_encuentro', (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getEncuentro = (req, res) => {
    let {id} = req.params;
    let encuentro = {
        datos,
        epp,
        equipos,
        parametro,
        puntos
    }
    const response = pool.query('SELECT * FROM proceso_encuentro WHERE Id_pro_enc = ?', [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.create = (req, res, next) => {
    let datos = req.body.datos;
    pool.query("INSERT INTO consulta(Codigo_emp,Nombre_cta,Fase_cta,Fecha_inicio,Fecha_fin) VALUES (?,?,?,?,?)", [Codigo_emp, Nombre_cta, 1, Fecha_inicio_fp, ""], (err, results) => {
        if(err) return res.status(500).send({success: false, body: err})
        req.body.relation = results.insertId;
        next();
    })
    let encuentro = {
        datos: {
            Descripcion_pro_enc: "",
            Personal_pro_enc: "",
            Observaciones_pro_enc: "",
            Id_cta,
        },
        epp: [
            [Elemento_epp,Descripcion_epp]
        ],
        equipo: [
            [Nombre_equipo, Descripcion_equipo]
        ],
        parametro: [
            [Descripcion_param]
        ],
        actividad: [
            [Nombre_act, Descripcion_act, Calidad_act, Seguridad_act, Ambiente_act]
        ]
    }
}

exports.relation = (req, res) => {

}
