const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

// Listar artistas
router.get('/', artistaController.listar);

// Formulário de criação
router.get('/criar', artistaController.criarForm);

// Criar artista
router.post('/', artistaController.criar);

// Formulário de edição
router.get('/:id/editar', artistaController.editarForm);

// Atualizar artista
router.put('/:id', artistaController.atualizar);

// Remover artista
router.delete('/:id', artistaController.remover);

// Buscar artistas
router.get('/buscar', artistaController.buscar);

module.exports = router;
