const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faixa = sequelize.define('Faixa', {
  titulo: DataTypes.STRING,
  duracao: DataTypes.STRING,
});

module.exports = Faixa;
