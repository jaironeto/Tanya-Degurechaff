const { DataTypes, } = require('sequelize');
const sequelize = require('../../public/database/_config');

const Disboard = sequelize.define('disboard', {
  guildId: {
    type: DataTypes.STRING(50),
    autoIncrement: false,
    primaryKey: true,
    unique: true
  },
  channel: {
    type: DataTypes.JSON,
    allowNull: false
  },
  temporizador:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  timer:{
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  role: {
    type: DataTypes.STRING(50),
  },
}, { freezeTableName: true });

sequelize.sync()
  .then(e => " ")

module.exports = {
  Disboard
}