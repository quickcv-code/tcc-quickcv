const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Curriculo = require('../models/Curriculo');
const Empresa = require('../models/Empresa');
const Vaga = require('../models/Vaga');
const Candidatura = require('../models/Candidatura');


const con = new Sequelize(dbConfig);

Usuario.init(con);
Curriculo.init(con);
Curriculo.associate(con.models);
Empresa.init(con);
Empresa.associate(con.models);
Vaga.init(con);
Vaga.associate(con.models);
Candidatura.init(con);


module.exports = con;