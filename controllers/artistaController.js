const { Artista, Disco, Genero } = require('../models/Index');
const { Op } = require('sequelize');

module.exports = {
  // Listar artistas
  async listar(req, res) {
    try {
      const artistas = await Artista.findAll({
        include: [Disco, Genero],
      });
      res.render('artistas/listar', { artistas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar artistas');
    }
  },

  // Mostrar formulário para criar artista
  async criarForm(req, res) {
    try {
      const generos = await Genero.findAll();
      res.render('artistas/criar', { generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de criação');
    }
  },

  // Criar artista
  async criar(req, res) {
    try {
      const { nome, generoIds } = req.body;

      const artista = await Artista.create({ nome });

      if (generoIds) {
        await artista.setGeneros(generoIds);
      }

      res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar artista');
    }
  },

  // Mostrar formulário para editar artista
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id, {
        include: [Genero],
      });

      if (!artista) {
        return res.status(404).send('Artista não encontrado');
      }

      const generos = await Genero.findAll();

      res.render('artistas/editar', { artista, generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de edição');
    }
  },

  // Atualizar artista
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, generoIds } = req.body;
      const artista = await Artista.findByPk(id);

      if (!artista) {
        return res.status(404).send('Artista não encontrado');
      }

      await artista.update({ nome });

      if (generoIds) {
        await artista.setGeneros(generoIds);
      } else {
        await artista.setGeneros([]);
      }

      res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar artista');
    }
  },

  // Remover artista
  async remover(req, res) {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id);

      if (!artista) {
        return res.status(404).send('Artista não encontrado');
      }

      await artista.destroy();
      res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao remover artista');
    }
  },

  // Buscar artistas
  async buscar(req, res) {
    try {
      const { nome, genero } = req.query;
      const where = {};
      const include = [];

      if (nome) {
        where.nome = { [Op.iLike]: `%${nome}%` };
      }

      if (genero) {
        include.push({
          model: Genero,
          where: { nome: { [Op.iLike]: `%${genero}%` } },
        });
      } else {
        include.push(Genero);
      }

      const artistas = await Artista.findAll({ where, include });
      res.render('artistas/listar', { artistas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar artistas');
    }
  },
};
