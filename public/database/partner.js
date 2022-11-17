const { GuildPartner, Partner } = require('./_configPartner')
const Continued = require('../error/continued')
const { Model } = require('sequelize');

// FUNÇÃO GUILD
async function guildPartner({ _guildId, _channel, membros, intervalo, role, guildIdBlock, auto, tag1, tag2 }, verifyUpdate) {
  if (!(verifyUpdate === undefined || verifyUpdate instanceof Model)) { throw new Continued('sintax error') }

  var check;
  if (verifyUpdate) { check = verifyUpdate }
  else { check = await GuildPartner.findByPk(_guildId) }

  if (!!check) {
    if (guildIdBlock !== undefined) { check.update({ guildIdBlock: guildIdBlock }) }
    if (_channel !== undefined) { check.update({ channel: _channel }) }
    if (auto !== undefined) { check.update({ auto: auto }) }
    if (tag1 !== undefined) { check.update({ tag1: tag1 }) }
    if (tag2 !== undefined) { check.update({ tag2: tag2 }) }
    if (role !== undefined) { check.update({ role: role }) }
    if (intervalo !== undefined) { check.update({ intervalo: intervalo }) }
    if (membros !== undefined) { check.update({ membros: membros }) }
  }
  else {
    const nowUpdate = GuildPartner.create({ guildId: _guildId, channel: _channel });
    await guildPartner({ _guildId: _guildId, membros: membros, _channel: _channel, intervalo: intervalo, role: role, guildIdBlock: guildIdBlock, auto: auto, tag1: tag1, tag2: tag2 }, nowUpdate);
  }
  return check
}

async function partner({ _guildId, _guildAlvo, messageId }) {
  const dados = await Partner.findOrCreate({
    where: { guildId: _guildId, guildAlvo: _guildAlvo }
  });

  if (messageId !== undefined) { await dados[0].update({ messageId: messageId }) }
  return dados;
}

async function buscarGuild(_guild) {
  const dados = await GuildPartner.findByPk(_guild)

  if (dados) {
    return dados.dataValues
  }
  else { return }
}

async function _deleteGuild(_guildId) {
  const dados = await GuildPartner.destroy({
    where: { guildId: _guildId }
  });

  if (dados) { return true }
  else { throw new Continued() }
}

module.exports = {
  partner,
  guildPartner,
  buscarGuild,
  _deleteGuild
}