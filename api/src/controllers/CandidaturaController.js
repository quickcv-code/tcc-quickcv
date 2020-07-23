const Vaga = require('../models/Vaga');
const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');
const { Op } = require('sequelize');
const DataHelper = require('../helpers/DataHelper');
const Candidatura = require('../models/Candidatura');
const Curriculo = require('../models/Curriculo');


module.exports = {
    //Possivel apenas para um usuário que possua empresa
    async criarProcessoSeletivo(req, res){

        const { user_id, empresa_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuário nao encontrado"});
        }

        const emp = await Empresa.findByPk(empresa_id);
        if(!emp){
            return res.status(400).json({error:"empresa nao encontrada"});
        }

        if(emp.id_usuario !== usuario.id){
            return res.status(400).json({error:"esta empresa não pertence a este usuário"});
        }

        const {
            titulo,
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
            empresa: emp.nome_fantasia,
            descricao,
            requisitos,
            informacoes_adicionais,
            area,
            prazo: prazo_formatado,
            disponivel,
            contato,
            processo_seletivo:true,
            id_empresa: emp.id,
         };
         
         const processoSeletivo = await Vaga.create(values);
         return res.json(processoSeletivo);
    },
    async alterarProcessoSeletivo(req, res){

        const { user_id, empresa_id, vaga_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuário nao encontrado"});
        }
        
        const vaga = await Vaga.findByPk(vaga_id);
        if(!vaga){
            return res.status(400).json({error:"Vaga nao encontrada"});
        }

        const emp = await Empresa.findByPk(empresa_id);
        if(!emp){
            return res.status(400).json({error:"empresa nao encontrada"});
        }

        if(emp.id_usuario !== usuario.id){
            return res.status(400).json({error:"esta empresa não pertence a este usuário"});
        }

        if(!vaga.processo_seletivo){
            return res.status(400).json({error: "Esta vaga não está aberta para processo seletivo"});
        }
        const {
            titulo,
            descricao,
            requisitos,
            informacoes_adicionais,
            area,
            prazo,
            contato
         } = req.body;
         
         const prazo_formatado = DataHelper.formataData(prazo);
         const disponivel = DataHelper.prazoVencido(prazo_formatado);
         
         await Vaga.update(
            {
              titulo, empresa: emp.nome_fantasia, descricao,
              requisitos,informacoes_adicionais,
              area, prazo:prazo_formatado,disponivel, contato
            },
            {
                returning: true,
                 where: {id:vaga_id}
           });
         
         const processoSeletivo = await Vaga.findByPk(vaga_id);
         return res.json(processoSeletivo);
    },

    async lista(req, res){
        const lista = await Vaga.findAll({
            where:{
                processo_seletivo:true
            }
        });
        console.log(lista);
        return res.json(lista);
    },

    //usuario deseja ver processos seletivos nos quais está cadastrado

    async listaProcessosPorUsuario(req, res){

        const { user_id } = req. params;
        const lista = await Candidatura.findAll({
            where: {
                id_usuario: user_id
            }
        });

        if(!lista){
            return res.status(400).json({error:"Nenhum resultado encontrado para o usuário fornecido"});
        }

        let listaDeVagas = [];

        lista.map(async candidatura => {
            listaDeVagas.push(await Vaga.findByPk(candidatura.id_vaga));
        });

        if(listaDeVagas.length === 0 ){
            return res.status(200).json({mensagem:"Nenhuma processo seletivo a exibir"});
        }

        return res.status(200).json(listaDeVagas);
    },

    //empresa deseja ver processos seletivos que cadastrou.

    async listaProcessosPorEmpresa(req, res){

        const { empresa_id } = req. params;
        const lista = await Vaga.findAll({
            where: {
                processo_seletivo: true,
                id_empresa: empresa_id
            }
        });

        if(!lista || lista.length === 0){
            return res.status(400).json({error:"Nenhum resultado encontrado"});
        }

        return res.status(200).json(lista);
    },

    //candidatura de currículo a processo seletivo.

    async criarCandidatura(req, res){

            const { user_id, curriculo_id, vaga_id } = req.params;
            const usuario = await Usuario.findByPk(user_id);
            if(!usuario){
                return res.status(400).json({error:"usuário nao encontrado"});
            }

            const curriculo = await Curriculo.findByPk(curriculo_id);
            if(!curriculo){
                return res.status(400).json({error:"curriculo nao encontrado"});
            }

            if(curriculo.id_usuario !== usuario.id){
                return res.status(400).json({error:"este currículo não pertence a este usuário"});
            }

            const vaga = await Vaga.findByPk(vaga_id);
           
            if(!vaga){
                return res.status(400).json({error:"vaga não encontrada"});
            }
            
            if(!vaga.processo_seletivo){
                return res.status(200).json({error:"Não é possível se candidatar a esta vaga pelo Quick CV."});
            }

            const empresa = Empresa.findByPk(vaga.id_empresa);
            if(!empresa){
                return res.status(400).json({error:"empresa não encontrada"});
            }
            
            const { confirma } = req.body;

            if(confirma){
                const candidatura = await Candidatura.create({
                    id_curriculo: curriculo.id,
                    id_vaga: vaga.id,
                    id_empresa: empresa.id,
                    id_usuario: usuario.id,
                });
    
                return res.json({
                    mensagem: "Currículo Registrado com sucesso!",
                    candidatura
                });
            }
            else{
                return res.status(400).json({error:"necessario confirmar a candidatura"});
            }
            
        },

        async retiraCandidatura(req, res){

            const { id_candidatura, user_id } = req.params;
            const usuario = await Usuario.findByPk(user_id);
            if(!usuario){
                return res.status(400).json({error:"usuario nao encontrado"});
            }
            await (await Candidatura.findByPk(id_candidatura)).destroy();
        return res.json({deleted: true});
        }, 


        async finalizaProcessoSeletivo(req, res){

            const { user_id, empresa_id, vaga_id } = req.params;
            const usuario = await Usuario.findByPk(user_id);
            if(!usuario){
                return res.status(400).json({error:"usuário nao encontrado"});
            }
            
            const vaga = await Vaga.findByPk(vaga_id);
            if(!vaga){
                return res.status(400).json({error:"Vaga nao encontrada"});
            }
    
            const emp = await Empresa.findByPk(empresa_id);
            if(!emp){
                return res.status(400).json({error:"empresa nao encontrada"});
            }
    
            if(emp.id_usuario !== usuario.id){
                return res.status(400).json({error:"esta empresa não pertence a este usuário"});
            }
    
            if(vaga.processo_seletivo === false){
                return res.status(400).json({error: "Esta vaga não está aberta para processo seletivo"});
            }

            const { finalizar } = req.body;

            if(finalizar){
                await Vaga.update({
                    processo_seletivo:false,
                },
                {
                    where: {id:vaga_id}
                });
    
                return res.status(200).json({mensagem: `Processo seletivo de ID: ${vaga_id} fechado com sucesso`});
            }
            else{
                return res.status(400).json({error:"necessario finalizar a candidatura"});
            }

            
        },
    
}
