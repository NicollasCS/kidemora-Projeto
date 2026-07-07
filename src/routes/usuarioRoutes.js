const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listarUsuarios);
router.post('/', usuarioController.criarUsuario);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.post('/:id/creditar', usuarioController.creditarSaldo);
router.post('/:id/gastar-passagem', usuarioController.gastarPassagem);

module.exports = router;