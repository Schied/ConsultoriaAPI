const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.find = (req, res, next) => {
    const nick = req.body.Nick_usu;
    const response = pool.query(`SELECT * FROM usuario WHERE Nick_usu = "${nick}"`, (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if(results.length>0){
            req.body.users = results;
        }
        next();
    });
}

exports.signin = async (req, res) => {
    if (!req.body.users) return res.status(404).send({ success: false, body: {message: 'Usuario no existe'} });
    let user = req.body.users[0];
    const match = await bcrypt.compare(req.body.Contra_usu, user.Contra_usu);
    delete user.Contra_usu;
    if (match) {
        jwt.sign({ user }, 'privateKey', function (err, token) {
            res.status(200).send({ success: true, body: {token} })
        });
    } else {
        res.status(403).send({ success: false, body: {message: 'Credenciales invalidas'} })
    }
}

exports.verifyToken = (req, res) => {
    let {token} = req.body;
    jwt.verify(token, 'privateKey', function(err, decoded) {
        if(err) return res.status(403).send({success: false, body: {message: 'Token invalido'}})
        res.status(200).send({success: true, body: {message: 'Token valido', decoded}})
    });
}