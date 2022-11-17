const verifyPartner = require('./messageCreate/message');
const config = require('./interaction/config');
const { buscarGuild } = require('../public/database/partner');
const enviado = require('./messageCreate/enviado');
const config_2 = require('./interaction/config_2');
const config_4 = require('./interaction/config_4');
const config_3 = require('./interaction/config_3');

async function Interaction(interaction, userId) {
  if (interaction.replied) { return userId }
  else if (interaction.isRepliable() === false) { return userId }
  else if (interaction.user.bot) { return userId }
  else if (!(interaction.channel.type === 0 || interaction.channel.type === 5)) { return userId } // GUILDCHANNEL AND PALCO
  else if (interaction.type !== 2) { return interaction.user.id } // COMANDODEBARRA
  else if (interaction?.options?._hoistedOptions[0]?.name === undefined) { return userId }
  else if (interaction?.options?._subcommand !== 'partner') { return userId }
  const hoistedOptions = interaction?.options?._hoistedOptions[0];

  if (hoistedOptions.name === "connect") {
    await config(interaction);
  } else if (hoistedOptions.name === "cargo") {
    await config_2(interaction);
  } else if (hoistedOptions.name === 'intervalo') {
    await config_3(interaction)
  } else if (hoistedOptions.name === 'membros') {
    await config_4(interaction)
  }
  
  return interaction.user.id
}

async function messageCreate(message) {
  if (message.author.bot) { return }
  if (message.type !== 0) { return } // MENSAGEM NORMAL
  if (!(message.channel.type === 0 || message.channel.type === 5)) { return } // GUILD

  await verifyPartner(message);
  enviado(message);
  return message.author.id
}

module.exports = {
  Interaction,
  messageCreate,
}