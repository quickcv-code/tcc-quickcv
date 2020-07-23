const jwt = require('jsonwebtoken');
const authConfig= require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ erro: "nenhum token encontrado"});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({ erro: "Erro no token"});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ erro: "token malformatado"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({ erro: "Token Inválido"});
        }

        req.userId = decoded.id;
        return next();
    });

}