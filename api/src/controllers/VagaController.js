const Vaga = require('../models/Vaga');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');
const DataHelper = require('../helpers/DataHelper');

module.exports = {
    async criar(req, res){

        const { user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const {
           titulo,
           empresa,
           descricao,
           requisitos,
           informacoes_adicionais,
           area,
           prazo,
           contato
        } = req.body;
        
        const prazo_formatado = DataHelper.formataData(prazo);
        const disponivel = DataHelper.prazoVencido(prazo_formatado);

        const values = {
           id_usuario: user_id, 
           titulo,
           empresa,
           descricao,
           requisitos,
           informacoes_adicionais,
           area,
           prazo: prazo_formatado,
           disponivel,
           contato
        };
        
        const vaga = await Vaga.create(values);
        return res.json(vaga);
    },

    //listar
    async listar (req, res){

        const lista = await Vaga.findAll();
        return res.send(lista);
    },

    async listarPorUsuario(req, res){

        const { user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const lista = await Vaga.findAll({
            where: {
                id_usuario: user_id
            }
        });


        if(lista.length === 0){
           return res.json({mensagem: "Este usuário nao possui vagas cadastradas"});
        }

        return res.status(200).json(lista);
    },
    //buscar
    async buscarPorId(req, res){

        const { id } = req.params;
        const vaga = await Vaga.findByPk(id);

        if(!vaga){
            return res.json({mensagem: "Vaga não encontrada"});
        }
        return res.json(vaga);
    },

    async buscarPorTitulo(req, res){

        const { titulo } = req.query;

        const vaga = await Vaga.findAll({
            where:{
                titulo:{
                    [Op.like]: `%${titulo}%`,
                }
            }
        });

        if(vaga.length === 0 ){
            return res.json({mensagem: "nenhuma vaga encontrada"});
        }

        return res.status(200).json(vaga);
    },

    async alterar(req, res) {

        const { user_id, vaga_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const vaga = await Vaga.findByPk(vaga_id);
        if(!vaga){
            return res.status(400).json({error: "vaga nao encontrada"});
        }

        const {
            titulo, empresa, descricao,
            requisitos,informacoes_adicionais,
            area, prazo, contato
         } = req.body;
         
        const prazo_formatado = DataHelper.formataData(prazo);
        const disponivel = DataHelper.prazoVencido(prazo_formatado);

          await Vaga.update(
              {
                titulo, empresa, descricao,
                requisitos,informacoes_adicionais,
                area, prazo:prazo_formatado,disponivel, contato
              },
              {
                  returning: true,
                   where: {id:vaga_id}
             });
        

            return res.status(200).json({mensagem: `Vaga id:${vaga_id} alterado com sucesso!`, vaga});  
    },
   

    //deletar
    async deletar (req, res) {

        const { user_id, id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        await (await Vaga.findByPk(id)).destroy();
        return res.json({deleted: true});
    },

    async atualizarPrazos(){

        const lista = await Vaga.findAll();

        
        lista.map(async vaga => {

            const disponivel = DataHelper.prazoVencido(vaga.prazo);
            const vaga_atualizada = await vaga.update(disponivel);
            console.log(vaga_atualizada);
        });

        console.log('Vagas Atualizadas');
    }
}