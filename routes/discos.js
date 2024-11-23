// routes/discos.js
const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');

// Listar discos
router.get('/', discoController.listar);

// Formulário de criação
router.get('/criar', discoController.criarForm);

// Criar disco
router.post('/', discoController.upload.single('capa'), discoController.criar);

// Formulário de edição
router.get('/:id/editar', discoController.editarForm);

// Atualizar disco
router.put('/:id', discoController.upload.single('capa'), discoController.atualizar);

// Remover disco
router.delete('/:id', discoController.remover);

// Buscar discos
router.get('/buscar', discoController.buscar);

module.exports = router;
