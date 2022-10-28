const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getUsers = (req, res) => {
    const response = pool.query('SELECT * FROM usuario', (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getUser = (req, res) => {
    let {codigo} = req.params;
    const response = pool.query('SELECT * FROM usuario WHERE Codigo_usu = ?', [codigo], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.getUserTipo = (req, res) => {
    let {codigo} = req.params;
    const response = pool.query('SELECT Nombre_usu, Tipo_usu FROM usuario WHERE Codigo_usu = ?', [codigo], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.create = (req, res) => {
    const {Nombre_usu, Fecha_usu, Tdocumento_td, Codigo_usu, Correo_usu, Telefono_usu, Nick_usu, Contra_usu, Tipo_usu, Correo_ins_usu, Codigo_ins_usu, Nombre_pg} = req.body;
    const pswHash = bcrypt.hashSync(Contra_usu, 10);
    const response = pool.query(`INSERT INTO usuario VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [Nombre_usu, Fecha_usu, Tdocumento_td, Codigo_usu, Correo_usu, Telefono_usu, Nick_usu, pswHash, Tipo_usu, Correo_ins_usu, Codigo_ins_usu, Nombre_pg], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}