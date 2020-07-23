const Curriculo = require('../models/Curriculo');
const Usuario = require('../models/Usuario');
const DataHelper = require('../helpers/DataHelper');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');


module.exports = {
    async criar(req, res){

        const{ user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
           return res.status(400).json({error: "Usuario Nao encontrado"});
        }

        const {
            nome_completo,
            estado_civil,
            nacionalidade,
            dependentes,
            endereco,
            cidade,
            estado,
            site_profissional1,
            site_profissional2,
            formacao_academica,
            objetivo,
            projetos,
            atividades,
            experiencia_profissional,
            formacao_complementar,
            qualificacoes,
        } = req.body;
       
        const {
            telefone,
            nascimento,
        } = usuario;

        const nascimento_string = DataHelper.dataParaString(nascimento);

        const values = {
            id_usuario:user_id, nome_completo, telefone, nascimento:nascimento_string,
            estado_civil, nacionalidade, dependentes, endereco,
            cidade, estado, site_profissional1, site_profissional2,
            formacao_academica,
            objetivo, projetos, atividades, experiencia_profissional,
            formacao_complementar, qualificacoes
        };
             
        const curriculo = await Curriculo.create(values);     
        return res.status(200).json(curriculo);
            
    },

    async listar(req, res){

        const{ user_id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
           return res.status(400).json({error: "Usuario Nao encontrado"});
        }

        const lista = await Curriculo.findAll({
            where: {
                id_usuario: user_id
            }
        });

        if(lista.length === 0){
           return res.json({mensagem: "Este usuário nao possui curriculos cadastrados"});
        }
        return res.status(200).json(lista);  
    },


    async buscar(req, res){

        const { id } = req.params;
        const curriculo = await Curriculo.findByPk(id);

        if(!curriculo){
            return res.json({mensagem: "Currículo não encontrado"});
        }
        return res.json(curriculo);
    },

    async alterar(req, res, next){
        
        const { user_id, id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        const {
            nome_completo, telefone, nascimento,
            estado_civil, nacionalidade, dependentes, endereco,
            cidade, estado, site_profissional1, site_profissional2,
            formacao_academica,
            objetivo, projetos, atividades, experiencia_profissional,
            formacao_complementar, qualificacoes
         } = req.body;


          await Curriculo.update(
              {nome_completo, telefone, nascimento,
                estado_civil, nacionalidade, dependentes, endereco,
                cidade, estado, site_profissional1, site_profissional2,
                formacao_academica,
                objetivo, projetos, atividades, experiencia_profissional,
                formacao_complementar, qualificacoes},
              {returning: true, where: {id}}
            );

            return res.status(200).json({mensagem: `Currículo id:${id} alterado com sucesso!`});
            
    },

    async deletar (req, res) {

        const { user_id, id } = req.params;
        const usuario = await Usuario.findByPk(user_id);
        if(!usuario){
            return res.status(400).json({error:"usuario nao encontrado"});
        }

        await (await Curriculo.findByPk(id)).destroy();
        return res.json({deleted: true});
    },

    async gerarPDF(req, res){

        try {
            const html = `<h1>Teste</h1>`;
    
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(html);
            await page.emulateMedia('screen');
            await page.pdf({
                path:"curriculo.pdf",
                format:'A4',
                printBackground: true,
            });

            console.log('feito');
            window.open('../curriculo.pdf');
            await browser.close();
            process.exit();
    

        }catch(err){
            console.log('Erro: ', err);
        }
    },

}