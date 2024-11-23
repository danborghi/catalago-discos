const sequelize = require('../config/database');
const Disco = require('./Disco');
const Artista = require('./Artista');
const Genero = require('./Genero');
const Faixa = require('./Faixa');

// Associações
Disco.belongsTo(Artista);
Artista.hasMany(Disco);

Disco.belongsToMany(Genero, { through: 'DiscoGenero' });
Genero.belongsToMany(Disco, { through: 'DiscoGenero' });

Artista.belongsToMany(Genero, { through: 'ArtistaGenero' });
Genero.belongsToMany(Artista, { through: 'ArtistaGenero' });

Disco.hasMany(Faixa);
Faixa.belongsTo(Disco);

Faixa.belongsToMany(Genero, { through: 'FaixaGenero' });
Genero.belongsToMany(Faixa, { through: 'FaixaGenero' });

// Sincronizando o modelo com o banco de dados
sequelize.sync();

module.exports = {
  Disco,
  Artista,
  Genero,
  Faixa,
};
