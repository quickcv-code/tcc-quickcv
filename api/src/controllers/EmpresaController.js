const Empresa = require('../models/Empresa');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');

module.exports = {
    async criar(req, res){

        const { user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const {
            razao_social,
            nome_fantasia,
            cnpj,
            endereco,
            cidade,
            estado,
            telefone,
            email,
            home_page1,
            home_page2,

        } = req.body;

         const values = {
           id_usuario: usuario.id, razao_social, nome_fantasia, cnpj,
           endereco, cidade, estado, telefone, email,
           home_page1, home_page2
        };
        
        const empresa = await Empresa.create(values);
        return res.json(empresa);
    },

    //listar
    async listar (req, res){

        const lista = await Empresa.findAll();
        return res.send(lista);
    },

    async listarPorUsuario(req, res){

        const { user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const lista = await Empresa.findAll({
            where: {
                id_usuario: user_id
            }
        });


        if(lista.length === 0){
           return res.json({mensagem: "Este usuário nao possui empresas cadastradas"});
        }

        return res.status(200).json(lista);
    },

    async buscarPorId(req, res){

        const { id } = req.params;
        const empresa = await Empresa.findByPk(id);

        if(!empresa){
            return res.json({mensagem: "Empresa não encontrada"});
        }
        return res.json(empresa);
    },

    async buscarPorNome(req, res){

        const { nome } = req.query;

        const empresa = await Empresa.findAll({
            where:{
                nome_fantasia:{
                    [Op.like]: `%${nome}%`,
                }
            }
        });

        if(empresa.length === 0 ){
            return res.json({mensagem: "nenhuma empresa encontrada"});
        }

        return res.status(200).json(empresa);
    },

    async alterar(req, res) {

        const { user_id, id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const {
            razao_social, nome_fantasia, cnpj,
            endereco, cidade, estado, telefone,
            email, home_page1, home_page2
         } = req.body;
         
         await Empresa.update(
              {
                razao_social, nome_fantasia, cnpj,
                endereco, cidade, estado, telefone,
                email, home_page1, home_page2
              },
              {
                   where: {id}
             });

        return res.status(200).json({mensagem: `Empresa id:${id} alterado com sucesso!`});  
    },

    //deletar
    async deletar (req, res) {

        const { user_id, id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        await (await Empresa.findByPk(id)).destroy();
        return res.json({deleted: true});
    },
}