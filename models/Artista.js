const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artista = sequelize.define('Artista', {
  nome: DataTypes.STRING,
});

module.exports = Artista;
