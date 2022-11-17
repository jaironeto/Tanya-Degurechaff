// const { guildPrivate } = require('../data/private');
const Continued = require('../../public/error/continued');
const { EmbedBuilder } = require('discord.js');
const guildPrivate = require('../data/guildPrivate');
const buscarGuildPrivate = require('../data/buscarGuildPrivate')
module.exports = async function slashMessage(interaction, hoistedOptions) {

  await interaction.editReply(`Configuração atualizada com sucesso \`message: ${hoistedOptions?.value}\``);
  const guildSQL = await buscarGuildPrivate(interaction.guildId);

  try { new EmbedBuilder().setDescription(hoistedOptions.value) }
  catch (e) { throw new Continued() }

  if (!guildSQL) {
    await interaction.editReply(`eu nem sei quem você é`);
    return
  }

  await guildPrivate({
    guild: interaction.guildId,
    channel: interaction.channelId,
    message: hoistedOptions.value,
    connect: true
  }, guildSQL);
}