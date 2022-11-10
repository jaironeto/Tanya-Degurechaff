const verifyPartner = require('./messageCreate/message');
const config = require('./interaction/config');
const { buscarGuild } = require('../public/database/partner');
const enviado = require('./messageCreate/enviado');
const config_2 = require('./interaction/config_2');
const config_4 = require('./interaction/config_4');
const config_3 = require('./interaction/config_3');

async function interaction(interaction) {
  if (interaction.user.bot) { return } // BOT
  if (!(interaction.channel.type === 0 || interaction.channel.type === 5)) { return } // GUILDCHANNEL AND PALCO
  if (interaction.type !== 2) { return } // COMANDODEBARRA
  
  if (interaction?.options?._hoistedOptions[0]?.name === undefined) { return }
  if (interaction?.options?._subcommand !== 'partner') { return }

  await interaction.deferReply();
  await config(interaction);
  await config_2(interaction);
  await config_3(interaction)
  await config_4(interaction)
}

async function messageCreate(message, codePartner) {
  if (message.author.bot) { return }
  if (message.type !== 0) { return } // MENSAGEM NORMAL
  if (!(message.channel.type === 0 || message.channel.type === 5)) { return } // GUILD

  await verifyPartner(message, codePartner);
  enviado(message, codePartner);
}

module.exports = {
  interaction,
  messageCreate,
}