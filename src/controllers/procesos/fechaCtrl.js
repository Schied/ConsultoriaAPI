const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getFechas = (req, res) => {
  pool.query('SELECT date_format(Fecha_inicio_fp, "%Y-%m-%d") as Fecha_inicio_fp, date_format(Fecha_fin_fp, "%Y-%m-%d") as Fecha_fin_fp, date_format(Fecha_estado_fp, "%Y-%m-%d") as Fecha_estado_fp FROM fecha_proceso WHERE id_fp = 1', (err, results) => {
    if (err) return res.status(500).send({success: false, body: err});
    res.status(200).send({success: true, body: results});
});
}

exports.update = (req, res) => {
    let {Fecha_inicio_fp, Fecha_fin_fp,Fecha_estado_fp} = req.body;
    pool.query("UPDATE fecha_proceso SET Fecha_inicio_fp = ?, Fecha_fin_fp = ?, Fecha_estado_fp = ? WHERE id_fp = 1", [Fecha_inicio_fp, Fecha_fin_fp,Fecha_estado_fp], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        return res.status(201).send({success: true, body: results});
    })
}