const { Guild, User, Predizer } = require('../../public/database/_configPrivate');
const Continued = require('../../public/error/continued');

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
  for (let guilds of client.guilds.cache) {
    const guildSQL = await buscarGuild(guilds[1].id);
    if (guildSQL === undefined) { continue };

    for (let channel of guilds[1].channels.cache) {
      const guildId = channel[1]?.guildId;
      const guildSQL = await buscarGuild(guildId);
      if (guildSQL === undefined) { continue };

      if (channel[1]?.guildId)
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
}

async function predizerInteraction(interaction) {
  const Members = await interaction.guild.members.fetch({ limit: interaction.guild.memberCount })
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

async function userAllPrivate() {
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


module.exports = {
  userAllPrivate,
  predizerManual,
  _deletePredizer,
  predizer,
  predizerInteraction
}