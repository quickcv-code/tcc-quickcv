const express = require('express');
require("dotenv-safe").config();
const auth = require('./middlewares/auth');
const schedule = require('node-schedule');


//controllers
const UsuarioController = require('./controllers/UsuarioController');
const CurriculoController = require('./controllers/CurriculoController');
const EmpresaController = require('./controllers/EmpresaController');
const VagaController = require('./controllers/VagaController');
const CandidaturaController = require('./controllers/CandidaturaController')

//schedule.scheduleJob('0 0 * * *', () => { VagaController.atualizarPrazos });

const router = express.Router();





// rotas
//ususarios
router.post('/usuarios/criar', UsuarioController.criar);
router.post('/login', UsuarioController.logar);
router.post('/logout', UsuarioController.logout);
router.post('/esqueci-minha-senha', UsuarioController.senhaEsquecida);
router.post('/redefinir-senha', UsuarioController.redefinirSenha);
router.get('/show', auth, UsuarioController.show);



//Curriculo
router.get('/curriculos/buscar/:id', CurriculoController.buscar);

router.post('/usuarios/:user_id/curriculos/criar', auth,CurriculoController.criar);
router.get('/usuarios/:user_id/curriculos/lista/', auth, CurriculoController.listar);
router.put('/usuarios/:user_id/curriculos/alterar/:id', auth,CurriculoController.alterar);
router.delete('/usuarios/:user_id/curriculos/deletar/:id', auth,CurriculoController.deletar);

//pdf
router.get('/usuarios/:user_id/curriculos/gerar-pdf/:id', CurriculoController.gerarPDF);

//Empresa
router.get('/empresa/listar', EmpresaController.listar);
router.get('/empresa/buscar/:id', EmpresaController.buscarPorId);
router.get('/empresa/buscar/', EmpresaController.buscarPorNome);

router.get('/usuarios/:user_id/empresa/listar', auth, EmpresaController.listarPorUsuario);
router.post('/usuarios/:user_id/empresa/criar', auth, EmpresaController.criar);
router.put('/usuarios/:user_id/empresa/alterar/:id', auth, EmpresaController.alterar);
router.delete('/usuarios/:user_id/empresa/deletar/:id', auth, EmpresaController.deletar);

//Vaga
router.get('/vaga/listar', VagaController.listar);
router.get('/vaga/buscar/:id', VagaController.buscarPorId);
router.get('/vaga/buscar/', VagaController.buscarPorTitulo);

router.get('/usuarios/:user_id/vaga/listar', auth, VagaController.listarPorUsuario);
router.post('/usuarios/:user_id/vaga/criar', auth, VagaController.criar);
router.put('/usuarios/:user_id/vaga/alterar/:vaga_id', auth, VagaController.alterar);
router.delete('/usuarios/:user_id/vaga/deletar/:id', auth, VagaController.deletar);

//processos seletivos
router.get('/processo-seletivo/listar', CandidaturaController.lista);
router.get('/processo-seletivo/buscar/empresa/:empresa_id', CandidaturaController.listaProcessosPorEmpresa);

router.get('/usuarios/:user_id/processo-seletivo/buscar/', CandidaturaController.listaProcessosPorUsuario);
router.post('/usuarios/:user_id/processo-seletivo/empresa/:empresa_id/criar', CandidaturaController.criarProcessoSeletivo);
//alterar processo seletivo
router.put('/usuarios/:user_id/processo-seletivo/:vaga_id/empresa/:empresa_id/alterar', CandidaturaController.alterarProcessoSeletivo);
//finalizar processo seletivo
router.post('/usuarios/:user_id/processo-seletivo/:vaga_id/empresa/:empresa_id/finalizar', CandidaturaController.finalizaProcessoSeletivo);
//candidatura
router.post('/usuarios/:user_id/curriculos/:curriculo_id/processo-seletivo/:vaga_id', CandidaturaController.criarCandidatura);


router.post('/usuarios/:user_id/curriculos/:curriculo_id/processo-seletivo/:vaga_id', CandidaturaController.criarCandidatura);
router.delete('/usuarios/:user_id/processo-seletivo/:candidatura_id', CandidaturaController.retiraCandidatura);


//candidaturas


module.exports = router;