const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getTDocs = (req, res) => {
    const response = pool.query('SELECT * FROM tipodocumento', (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getTDoc = (req, res) => {
    let {doc} = req.params;
    const response = pool.query('SELECT * FROM tipodocumento WHERE Tdocumento_td = ?', [doc], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.createTDoc = (req, res) => {
    const {Tdocumento_td, Descripcion_td} = req.body;
    const response = pool.query(`INSERT INTO tipodocumento VALUES (?, ?)`, [Tdocumento_td, Descripcion_td], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

exports.updateTDoc = (req, res) => {
    const {Tdocumento_td, Descripcion_td} = req.body;
    const response = pool.query(`UPDATE tipodocumento SET Descripcion_td = ? WHERE Tdocumento_td = ?`, [Descripcion_td, Tdocumento_td], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

exports.deleteTDoc = (req, res) => {
    const {Tdocumento_td} = req.body;
    const response = pool.query(`DELETE FROM tipodocumento WHERE Tdocumento_td = ?`, [Tdocumento_td], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(201).send({success: true, body: results});
    });
}

