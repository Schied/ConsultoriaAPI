//core
const express = require('express');
const cors = require('cors');
const app = express();

//import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const pgRoutes = require('./routes/pg');
const tipoDocRoutes = require('./routes/tipoDoc');
const empRoutes = require('./routes/emp');
const ctaRoutes = require('./routes/procesos/cta');
const fechaRoutes = require('./routes/procesos/fechaP');
const enctoRoutes = require('./routes/procesos/encto');
const dsrlloRoutes = require('./routes/procesos/dsrllo');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/user', userRoutes);
app.use('/user/auth', authRoutes);
app.use('/pg', pgRoutes);
app.use('/tdoc', tipoDocRoutes);
app.use('/emp', empRoutes);
app.use('/fecha', fechaRoutes);
app.use('/cta', ctaRoutes);
app.use('/encto', enctoRoutes)
app.use('/dsrllo', dsrlloRoutes);

module.exports = app;