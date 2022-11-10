const { DataTypes, } = require('sequelize');
const sequelize = require('./_config');

const Partner = sequelize.define('partner', {
  guildId: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  messageId: {
    type: DataTypes.STRING(50),
  },
}, { freezeTableName: true });

const GuildPartner = sequelize.define('guildPartner', {
  guildId: {
    type: DataTypes.STRING(50),
    autoIncrement: false,
    primaryKey: true,
    unique: true
  },
  role: {
    type: DataTypes.STRING(50),
  },
  channel: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  intervalo: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 30
    }
  },
  membros: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 100000
    }
  },
  guildIdBlock: {
    type: DataTypes.JSON,
  },
  auto: {
    type: DataTypes.BOOLEAN,
  },
  tag1: {
    type: DataTypes.STRING(50),
  },
  tag2: {
    type: DataTypes.STRING(50),
  }
}, { freezeTableName: true });

GuildPartner.hasMany(Partner, {
  foreignKey: {
    type: DataTypes.STRING(50),
    name: 'guildAlvo',
    allowNull: false
  }
});

sequelize.sync()
  .then(e => " ")

module.exports = {
  GuildPartner,
  Partner
}