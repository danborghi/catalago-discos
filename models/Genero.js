const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define('Genero', {
  nome: DataTypes.STRING,
});

module.exports = Genero;
