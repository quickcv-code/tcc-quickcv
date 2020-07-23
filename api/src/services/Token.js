const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = {
    gerar(params = {}){
       return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400,
    });
    },
}