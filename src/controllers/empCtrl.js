const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getEmps = (req, res) => {
    const response = pool.query('SELECT * FROM empresa', (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getEmp = (req, res) => {
    let {id} = req.params;
    const response = pool.query('SELECT * FROM empresa WHERE Codigo_emp = ?', [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.getRelation = (req, res) => {
    let {id} = req.params;
    pool.query("SELECT empresa.Nombre_emp, usuario.Nombre_usu FROM empresa INNER JOIN usuario ON empresa.Codigo_usu = usuario.Codigo_usu WHERE empresa.Codigo_emp = ?", [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    })
}

exports.isEmpresa = (req, res, next) => {
    let Codigo_usu = req.body.Codigo_usu;
    pool.query(`SELECT Tipo_usu FROM usuario WHERE Tipo_usu = "Empresa" AND Codigo_usu = ?`, [Codigo_usu],(err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if(!results.length > 0) return res.status(404).send({success: false, body: {message:  'Tipo de usuario no valido'}})
        next();
    });
}

exports.create = (req, res) => {
    const {Nombre_emp, Tdocumento_td, Codigo_emp, Celular_emp, Telefono_emp, Correo_emp, Codigo_usu} = req.body;    
    pool.query(`INSERT INTO empresa VALUES (?, ?, ?, ?, ?, ?, ?)`, [Nombre_emp, Tdocumento_td, Codigo_emp, Celular_emp, Telefono_emp, Correo_emp, Codigo_usu], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}