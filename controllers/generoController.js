const { Genero } = require('../models/Index');
const { Op } = require('sequelize');

module.exports = {
  // Listar gêneros
  async listar(req, res) {
    try {
      const generos = await Genero.findAll();
      res.render('generos/listar', { generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar gêneros');
    }
  },

  // Mostrar formulário para criar gênero
  async criarForm(req, res) {
    try {
      res.render('generos/criar');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de criação');
    }
  },

  // Criar gênero
  async criar(req, res) {
    try {
      const { nome } = req.body;

      await Genero.create({ nome });

      res.redirect('/generos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar gênero');
    }
  },

  // Mostrar formulário para editar gênero
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);

      if (!genero) {
        return res.status(404).send('Gênero não encontrado');
      }

      res.render('generos/editar', { genero });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de edição');
    }
  },

  // Atualizar gênero
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const genero = await Genero.findByPk(id);

      if (!genero) {
        return res.status(404).send('Gênero não encontrado');
      }

      await genero.update({ nome });

      res.redirect('/generos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar gênero');
    }
  },

  // Remover gênero
  async remover(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);

      if (!genero) {
        return res.status(404).send('Gênero não encontrado');
      }

      await genero.destroy();
      res.redirect('/generos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao remover gênero');
    }
  },

  // Buscar gêneros
  async buscar(req, res) {
    try {
      const { nome } = req.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.iLike]: `%${nome}%` };
      }

      const generos = await Genero.findAll({ where });
      res.render('generos/listar', { generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar gêneros');
    }
  },
};
