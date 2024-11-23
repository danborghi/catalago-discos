const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

// Listar gêneros
router.get('/', generoController.listar);

// Formulário de criação
router.get('/criar', generoController.criarForm);

// Criar gênero
router.post('/', generoController.criar);

// Formulário de edição
router.get('/:id/editar', generoController.editarForm);

// Atualizar gênero
router.put('/:id', generoController.atualizar);

// Remover gênero
router.delete('/:id', generoController.remover);

// Buscar gêneros
router.get('/buscar', generoController.buscar);

module.exports = router;
