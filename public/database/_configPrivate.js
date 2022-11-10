const { DataTypes, } = require('sequelize');
const sequelize = require('./_config');

const Guild = sequelize.define('guild', {
  guild: {
    type: DataTypes.STRING(30),
    autoIncrement: false,
    primaryKey: true,
    unique: true
  },
  channel: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  connect: {
    type: DataTypes.BOOLEAN,
  },
  message : {
    type: DataTypes.STRING(1900),
    defaultValue: "Sem Texto"
  },
  image : {
    type: DataTypes.STRING(50),
    defaultValue: "https://i.imgur.com/yTqTAM9.gif"
  },
  mencao: {
    type: DataTypes.STRING(30)
  },
  opcao1: {
    type: DataTypes.STRING(50)
  },
  opcao2: {
    type: DataTypes.STRING(50)
  },
  opcao3: {
    type: DataTypes.STRING(50)
  },
  opcao4: {
    type: DataTypes.STRING(50)
  },
  canal1: {
    type: DataTypes.STRING(50)
  },
  canal2: {
    type: DataTypes.STRING(50)
  },
  canal3: {
    type: DataTypes.STRING(50)
  },
  canal4: {
    type: DataTypes.STRING(50)
  },
}, { freezeTableName: true });



const User = sequelize.define('user', {
  user: {
    type: DataTypes.STRING(30),
    autoIncrement: false,
    primaryKey: true,
  },
  guild: { 
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  opcoes: { // DADOS JSON PRA TROCAR OS SERVERS
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isIn: [['ocioso', 'ativo', 'opcões']]
    },
  },
  replyPrivateMessage: {
    type: DataTypes.STRING(50),
  },
  replyGuildMessage:{
    type: DataTypes.STRING(50),
  },
  replyGuildChannel:{
    type: DataTypes.STRING(50),
  },
  staff: {
    type: DataTypes.STRING(50),
  },
}, { freezeTableName: true });


const Predizer = sequelize.define('predizer', {
  user: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  guild: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastMsg: {
    type: DataTypes.BIGINT, // possivel erro
  },
}, { freezeTableName: true });

sequelize.sync()
  .then(() => '\ndatabase sincronizado\n')

module.exports = {
  Guild,
  User,
  Predizer,
}