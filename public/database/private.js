const { Guild, User, Predizer } = require('./_configPrivate')
const { Continued } = require('../error/continued')
const { Op } = require("sequelize");

// FUNÇÃO USER
async function user({ _user, _guild, _status, _opcoes, reply, staff, replyPrivateMessage, replyGuildMessage, replyGuildChannel }) {
  const check = await User.findByPk(_user)

  if (check !== null) {
    if (_guild !== undefined) { await check.update({ guild: _guild }) }
    if (_status !== undefined) { await check.update({ status: _status }) }
    if (staff !== undefined) { await check.update({ staff: staff }) }
    if (reply !== undefined) { await check.update({ reply: reply }) }
    if (_opcoes !== undefined) { await check.update({ reply: _opcoes }) }
    if (replyPrivateMessage !== undefined) { await check.update({ replyPrivateMessage: replyPrivateMessage }) }
    if (replyGuildMessage !== undefined) { await check.update({ replyGuildMessage: replyGuildMessage }) }
    if (replyGuildChannel !== undefined) { await check.update({ replyGuildChannel: replyGuildChannel }) }
  }
  else {
    await User.create({ user: _user, guild: _guild, status: _status, opcoes: _opcoes })
    await this.user({ _user: _user, _guild: _guild, _status: _status, _opcoes: _opcoes, reply: reply, staff: staff, replyPrivateMessage: replyPrivateMessage, replyGuildMessage: replyGuildMessage, replyGuildChannel: replyGuildChannel })
    // CHAMA A FUNÇÃO DE FORMA RECURSIVA PARA QUE INICIALIZE QUAISQUER OUTROS PARAMETROS NAO OBRIGATORIO
    //await this.user( _user, _guild, _status, _opcoes, reply, staff )
  }
}

// FUNÇÃO GUILD
async function guild({ _guild, _channel, connect, message, image, mencao, opcao1, opcao2, opcao3, opcao4, canal1, canal2, canal3, canal4 }) {
  const check = await Guild.findByPk(_guild)

  if (check !== null) {
    if (_channel !== undefined) { check.update({ channel: _channel }) }
    if (connect !== undefined) { check.update({ connect: connect }) }
    if (message !== undefined) { check.update({ message: message }) }
    if (image !== undefined) { check.update({ image: image }) }
    if (mencao !== undefined) { check.update({ mencao: mencao }) }
    if (opcao1 !== undefined) { check.update({ opcao1: opcao1 }) }
    if (opcao2 !== undefined) { check.update({ opcao2: opcao2 }) }
    if (opcao3 !== undefined) { check.update({ opcao3: opcao3 }) }
    if (opcao4 !== undefined) { check.update({ opcao4: opcao4 }) }
    if (canal1 !== undefined) { check.update({ canal1: canal1 }) }
    if (canal2 !== undefined) { check.update({ canal2: canal2 }) }
    if (canal3 !== undefined) { check.update({ canal3: canal3 }) }
    if (canal4 !== undefined) { check.update({ canal4: canal4 }) }
  }
  else {
    await Guild.create({ guild: _guild, channel: _channel });
    // CHAMA A FUNÇÃO DE FORMA RECURSIVA PARA QUE INICIALIZE QUAISQUER OUTROS PARAMETROS NAO OBRIGATORIO
    await this.guild({ _guild: _guild, _channel: _channel, connect: connect, message: message, image: image, mencao: mencao, opcao1: opcao1, opcao2: opcao2, opcao3: opcao3, opcao4: opcao4, canal1: canal1, canal2: canal2, canal3: canal3, canal4: canal4 })
  }
  return check
}

async function predizerManual({ user, guild }) {
  return await Predizer.findOrCreate({
    where: {
      user: user,
      guild: guild
    }
  });
}

async function predizer(client) {

  // ULTIMAS MENSAGENS ENVIADA  
  const Channels = client.channels.cache;
  for (let channel of Channels) {
    if (!(channel[1]?.isTextBased())) { continue }

    const Messages = await channel[1]?.messages?.fetch([{ limit: 100000 }])
    if (Messages.size === 0) { continue }

    for (let message of Messages) {
      if (message[0] === undefined || message?.size === 0) { continue }
      if (message[1]?.author?.bot) { continue }

      const atualizar = await Predizer.findOrCreate({
        where: {
          user: message[1].author.id,
          guild: message[1].guildId
        },
      });

      if (atualizar[0].dataValues.lastMsg === undefined ||
        atualizar[0]?.dataValues?.lastMsg < message[1]?.createdTimestamp) {

        await Predizer.update({ lastMsg: message[1]?.createdTimestamp }, {
          where: {
            user: message[1]?.author?.id,
            guild: message[1]?.guildId
          }
        });
      }
    }
  }
}

async function predizerGuildAd(guild) {

  const Members = await guild.members.fetch({ limit: 100000 })
  if (Members.size === 0) { return }
  for (let member of Members) {
    if (member[0] === undefined) { continue }
    await Predizer.findOrCreate({
      where: {
        user: member[0],
        guild: member[1]?.guild?.id,
      },
    });
  }
}

async function buscarGuild(_guild) {
  const dados = await Guild.findByPk(_guild)
  if (dados) {
    return dados.dataValues
  }
  else { return }
}

async function buscarUser(_user) {
  const dados = await User.findByPk(_user)
  if (dados) {
    return dados.dataValues
  }
  else { return }
}

async function buscarPredizer(_user) {
  const dados = await Predizer.findAll({
    where: {
      user: _user
    }
  });
  if (dados.length === 0) { return }
  else {
    return dados // OBSERVAÇÃO
  }
}

async function userAll() {
  const dados = await User.findAll()
  var filtro = [];

  if (dados.length !== 0) {
    dados.forEach((element, index) => {
      filtro[index] = element.dataValues
    })
    return filtro
  }
  else { return }
}

async function _deletePredizer({ user, guild }) {

  const dados = await Predizer.destroy({
    where: {
      user: user,
      guild: guild
    }
  });

  if (dados) { return true }
  else { throw new Continued() }
}

async function _deleteGuild(_guild) {
  const dados = await Guild.destroy({
    where: {
      guild: _guild
    }
  })

  if (dados) { return true }
  else { throw new Continued() }
}

async function _deleteUser(_user) {
  const dados = await User.destroy({
    where: {
      user: _user
    }
  })

  if (dados) { return true }
  else { throw new Continued() }
}

module.exports = {
  user,
  guild,
  buscarGuild,
  buscarUser,
  buscarPredizer,
  userAll,
  _deleteGuild,
  _deleteUser,
  predizerManual,
  _deletePredizer,
  predizer,
  predizerGuildAd
}