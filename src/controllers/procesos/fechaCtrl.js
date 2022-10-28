const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.update = (req, res) => {
    let {Fecha_inicio_fp, Fecha_fin_fp,Fecha_estado_fp} = req.body;
    pool.query("UPDATE fecha_proceso SET Fecha_inicio_fp = ?, Fecha_fin_fp = ? Fecha_estado_fp = ?", [Fecha_inicio_fp, Fecha_fin_fp,Fecha_estado_fp], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        return res.status(201).send({success: true, body: results});
    })
}