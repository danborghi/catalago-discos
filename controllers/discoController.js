// controllers/discoController.js
const { Disco, Artista, Genero, Faixa } = require('../models/Index');
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

// Configurando o multer para upload de imagens
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

module.exports = {
  upload,

  // Listar discos
  async listar(req, res) {
    try {
      const discos = await Disco.findAll({
        include: [Artista, Genero, Faixa],
      });
      res.render('discos/listar', { discos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar discos');
    }
  },

  // Mostrar formulário para criar disco
  async criarForm(req, res) {
    try {
      const artistas = await Artista.findAll();
      const generos = await Genero.findAll();
      res.render('discos/criar', { artistas, generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de criação');
    }
  },

  // Criar disco
  async criar(req, res) {
    try {
      const { titulo, anoLancamento, artistaId, generoIds } = req.body;
      const capa = req.file ? req.file.filename : null;

      const disco = await Disco.create({
        titulo,
        anoLancamento,
        capa,
        ArtistaId: artistaId,
      });

      if (generoIds) {
        await disco.setGeneros(generoIds);
      }

      res.redirect('/discos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar disco');
    }
  },

  // Mostrar formulário para editar disco
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const disco = await Disco.findByPk(id, {
        include: [Artista, Genero, Faixa],
      });

      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }

      const artistas = await Artista.findAll();
      const generos = await Genero.findAll();

      res.render('discos/editar', { disco, artistas, generos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de edição');
    }
  },

  // Atualizar disco
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, artistaId, generoIds } = req.body;
      const disco = await Disco.findByPk(id);

      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }

      const capa = req.file ? req.file.filename : disco.capa;

      await disco.update({
        titulo,
        anoLancamento,
        capa,
        ArtistaId: artistaId,
      });

      if (generoIds) {
        await disco.setGeneros(generoIds);
      } else {
        await disco.setGeneros([]);
      }

      res.redirect('/discos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar disco');
    }
  },

  // Remover disco
  async remover(req, res) {
    try {
      const { id } = req.params;
      const disco = await Disco.findByPk(id);

      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }

      await disco.destroy();
      res.redirect('/discos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao remover disco');
    }
  },

  // Buscar discos
  async buscar(req, res) {
    try {
      const { titulo, artista, genero } = req.query;
      const where = {};
      const include = [];

      if (titulo) {
        where.titulo = { [Op.iLike]: `%${titulo}%` };
      }

      if (artista) {
        include.push({
          model: Artista,
          where: { nome: { [Op.iLike]: `%${artista}%` } },
        });
      } else {
        include.push(Artista);
      }

      if (genero) {
        include.push({
          model: Genero,
          where: { nome: { [Op.iLike]: `%${genero}%` } },
        });
      } else {
        include.push(Genero);
      }

      const discos = await Disco.findAll({ where, include });
      res.render('discos/listar', { discos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar discos');
    }
  },
};
