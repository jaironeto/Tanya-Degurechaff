const { disboard } = require("./database/disboard")
const config = require("./interaction/config")
const config_1 = require("./interaction/config_1")

async function messageCreate(message) {
  if (message.author.id !== '302050872383242240') { return }
  if (!message.embeds[0].description.includes('Bump done!')) { return }

  const dadosSQL = await disboard({ _guildId: message.guildId, verifyBusca: true });
  if (dadosSQL?.dataValues === undefined) { return }
  await dadosSQL.update({ timer: new Date(message.createdTimestamp + 7200000) })

  if (dadosSQL?.dataValues?.temporizador) {
    const timeoutId = setInterval(async () => {
      const _dadosSQL = await disboard({ _guildId: message.guildId, verifyBusca: true });
      await _dadosSQL.update({ temporizador: false })
      const dadosSQL = _dadosSQL?.dataValues;

      if (dadosSQL === undefined) {
        timeoutId._destroyed = true;
      } else {
        const timer = new Date(dadosSQL.timer) - new Date();

        if (timer < 0) {
          await message.client.channels.cache.get(dadosSQL?.channel?.id)
            .send(`Disboard pronto para \`\\bump\` <@&${dadosSQL?.role}>`)
        } else {
          timeoutId._repeat = timer;
        }
      }
    }, 7200000);
  }
  else {
    await dadosSQL.update({ temporizador: true })
  }
}

async function interaction(interaction) {
  if (interaction.user.bot) { return } // BOT
  if (!(interaction.channel.type === 0 || interaction.channel.type === 5)) { return } // GUILDCHANNEL AND PALCO
  if (interaction.type !== 2) { return } // COMANDODEBARRA  
  if (interaction?.options?._hoistedOptions[0]?.name === undefined) { return }
  if (interaction?.options?._subcommand !== 'disboard') { return }
  const hoistedOptionsName = interaction?.options?._hoistedOptions[0]?.name;

  await interaction.deferReply();
  if (hoistedOptionsName === 'ativar') { await config_1(interaction) }
  else { await config(interaction) }
}

module.exports = {
  messageCreate,
  interaction
}