const express = require('express');
const router = express.Router();
const partidasController = require('../controllers/partidasController');

// Listar todas as partidas
router.get('/', partidasController.listarPartidas);

// Obter uma partida específica (esta rota deve vir antes de outras rotas com parâmetros)
router.get('/:id', partidasController.obterPartida);

// Outras rotas
router.post('/', partidasController.criarPartida);
router.post('/:id/jogadores', partidasController.adicionarJogador);
router.put('/:partidaId/jogadores/:jogadorNome/presenca', partidasController.confirmarPresenca);
router.delete('/:id', partidasController.excluirPartida);

module.exports = router;
