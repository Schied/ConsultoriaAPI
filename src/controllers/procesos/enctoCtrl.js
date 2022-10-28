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

}

exports.relation = (req, res) => {

}
