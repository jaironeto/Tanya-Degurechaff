const { Sequelize, DataTypes, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('discord', 'root', 'sua senha', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    acquire: 1200000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(e => console.log('\nbanco de dados iniciado com sucesso!\n'))
  .catch(e => console.log('\nocorreu um erro no banco de dados"\n'))

module.exports = sequelize;