const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disco = sequelize.define('Disco', {
  titulo: DataTypes.STRING,
  anoLancamento: DataTypes.INTEGER,
  capa: DataTypes.STRING,
});

module.exports = Disco;
