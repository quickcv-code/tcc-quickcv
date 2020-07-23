const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const DateHelper = require('../helpers/DataHelper');
const Token = require('../services/Token');
const crypto = require('crypto');
const Mailer = require('../services/Mailer');

module.exports = {
    async criar(req, res){

        const { 
            email,
            senha,
            nome,
            sobrenome, 
            telefone,
            nascimento 
        } = req.body;
        const nome_completo = nome + ' ' + sobrenome;

        const nascimento_formatado = DateHelper.formataData(nascimento);

        const existente = await Usuario.findAll({
            where: {
                email
            }
        });

        if(existente.length>0){
            console.log('usuario ja cadastrado');
            return res.status(406).json({ mensagem: "Usuário já cadastrado" });
        }

        bcrypt.hash(senha, 10, async function(err, hash){

            try{
                const user = await Usuario.create({
                    email, senha:hash, nome:nome_completo,
                     telefone, nascimento:nascimento_formatado,
                     senha_reset_token:null,
                     senha_token_expira:null, 
                    });
                user.senha = undefined;
                user.senha_token_expira = undefined;
                user.senha_reset_token = undefined;
    
                
                return res.status(200).json({
                    user,
                    token: Token.gerar({id: user.id })
                });
            } catch(err){
                console.log(err);
            }
        });      
    },


    async logar(req, res, next){

        const { email, senha } = req.body;
        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if(!user){
            return res.status(400).json({error:"Email não cadastrado"});
        }

        if(!await bcrypt.compare(senha, user.senha)){
            return res.status(401).json({message: 'Login inválido!'});
        }

        user.senha = undefined;

        return res.status(200).json({
            user,
            token: Token.gerar({id: user.id })
        });

        
    },

    logout(req, res){

        res.json({ auth: false, token: null });
    },

    async senhaEsquecida(req, res){
        const { email } = req.body;

        try {   

            const usuario = await Usuario.findOne({
                where: {
                    email
                }
            });

            if(!usuario){

                return res.status(400).json({error: "Usuário não encontrado."})
            }

            const token = crypto.randomBytes(20).toString('hex');

            const expires = new Date();
            expires.setHours(expires.getHours() + 1);

            await Usuario.update({
                senha_reset_token:token,
                senha_token_expira:expires,
            },{
                where: {
                    id: usuario.id
                }
            });
            
            Mailer.sendMail({
                from: "QuickCV <quickcvnotreply@gmail.com>",
                to: email,
                subject: "Recuperação de senha - Não Responder.",
                text: "Email Automático para recuperação de senha do QuickCV",
                html: `<p> Para recuperar sua senha, utilize este token: ${token}</p><br><p>Lembre-se de que ele expira em 1 Hora!</p>`
            }).then( message => {
                console.log(message);
            }).catch(err => {
                console.log(err);
            });
            return res.status(200).send(`Email enviado para ${email}`);


        } catch(err){
            return res.status(400).json({error: err })
        }
    },

    async redefinirSenha(req, res) {

        const { email, token, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if(!user){
            return res.status(400).json({error:"Email não cadastrado"});
        }

        if( token !== user.senha_reset_token ){
            return res.status(400).json({mensagem: "Token inválido"});
        }

        const agora = new Date();

        if(agora > user.senha_token_expira){
            return res.status(400).json({mensagem: "Token expirou"});
        }

        //tudo certo
        bcrypt.hash(senha, 10, async function(err, hash){

            await Usuario.update({ senha:hash },
                {where: {
                    id: user.id
                }});

            user.senha = undefined;
            user.senha_token_expira = undefined;
            user.senha_reset_token = undefined;
            
            return res.status(200).json({
                user,
                token: Token.gerar({id: user.id })
            });
            
        });  

    },

    async show(req, res, next){

        return res.json({msg: "SHOW!"});
    }
}