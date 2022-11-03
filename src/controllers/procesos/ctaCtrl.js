const mysql = require('mysql');
const bcrypt = require('bcrypt');

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  database        : 'consultoria_db'
});

exports.getCtas = (req, res) => {
    pool.query('SELECT * FROM consulta', (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        res.status(200).send({success: true, body: results});
    });
}

exports.getCtaByUser = (req, res) => {
    let {id} = req.params;
    const response = pool.query('SELECT consulta.Id_cta as Id_cta, consulta.Codigo_emp as Codigo_emp, consulta.Nombre_cta as Nombre_cta, consulta.Fase_cta as Fase_cta, consulta.Fecha_inicio as Fecha_inicio, consulta.Fecha_fin as Fecha_fin FROM consulta INNER JOIN usuario_consulta ON consulta.Id_cta = usuario_consulta.Id_cta WHERE usuario_consulta.Codigo_usu = ?', [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.getCtaById = (req, res) => {
    let {id} = req.params;
    const response = pool.query('SELECT * FROM consulta WHERE Id_cta = ?', [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.getCtaByName = (req, res) => {
    let {name} = req.params;
    const response = pool.query('SELECT * FROM consulta WHERE Nombre_cta LIKE ?', ["%"+name+"%"], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.getCtaByIdEmpresa = (req, res) => {
    let {id} = req.params;
    const response = pool.query('SELECT * FROM consulta WHERE Codigo_emp = ?', [id], (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if (!results.length > 0) return res.status(404).send({success: false, body: {message:  'No encontrado'}})
        res.status(200).send({success: true, body: results});
    });
}

exports.create = (req, res, next) => {
    let {Codigo_emp, Nombre_cta} = req.body.cta;
    let Fecha_inicio_fp = new Date;
    pool.query("SELECT * FROM fecha_proceso", (err, results) => {
        if (err) return res.status(500).send({success: false, body: err});
        if(Fecha_inicio_fp > results[0].Fecha_inicio_fp && Fecha_inicio_fp < results[0].Fecha_fin_fp && Fecha_inicio_fp < results[0].Fecha_estado_fp){
            pool.query("INSERT INTO consulta(Codigo_emp,Nombre_cta,Fase_cta,Fecha_inicio,Fecha_fin) VALUES (?,?,?,?,?)", [Codigo_emp, Nombre_cta, 1, Fecha_inicio_fp, ""], (err, results) => {
                if(err) return res.status(500).send({success: false, body: err})
                req.body.relation = results.insertId;
                next();
            })
        }else{
            return res.status(200).send({success: false, body: {message: "Fecha de inicio invalida"}})
        }
    });
}

exports.relation = (req, res) => {
    let users = req.body.users;
    for (let index = 0; index < users.length; index++) {
        users[index].push(req.body.relation);
    }
    for (let index = 0; index < users.length; index++) {
        pool.query("INSERT INTO usuario_consulta (Codigo_usu, Id_cta) VALUES (?,?)", users[index], (err, results) => {
            if(err) return res.status(500).send({success: false, body: err})
        })
    }
    return res.status(201).send({success: true, body: {message: "Se han insertado las relaciones al proceso numero: "+req.body.relation}});
    
}
