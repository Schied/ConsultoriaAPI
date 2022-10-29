const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getPgs = (req, res) => {
    const response = pool.query('SELECT * FROM programa WHERE Nombre_pg != ? AND Nombre_pg != ?',["Administrador", "Empresa"], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getPg = (req, res) => {
    let {pg} = req.params;
    const response = pool.query('SELECT * FROM programa WHERE Nombre_pg = ?', [pg], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.createPg = (req, res) => {
    const {Nombre_pg, Descripcion_pg} = req.body;
    const response = pool.query(`INSERT INTO programa (Nombre_pg, Descripcion_pg) VALUES (?, ?)`, [Nombre_pg, Descripcion_pg], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

exports.updatePg = (req, res) => {
    const {Id_pg, Nombre_pg, Descripcion_pg} = req.body;
    const response = pool.query(`UPDATE programa SET Nombre_pg = ?, Descripcion_pg = ? WHERE Id_pg = ?`, [Nombre_pg, Descripcion_pg, Id_pg], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

exports.deletePg = (req, res) => {
    const {Id_pg} = req.body;
    const response = pool.query(`DELETE FROM programa WHERE Id_pg = ?`, [Id_pg], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

