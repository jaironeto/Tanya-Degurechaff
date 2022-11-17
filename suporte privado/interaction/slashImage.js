const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const Continued = require('../../public/error/continued');
const guildPrivate = require('../data/guildPrivate');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');

module.exports = async function slashImage(interaction, hoistedOptions) {

  await interaction.editReply(`Configuração atualizada com sucesso \`image: ${hoistedOptions?.value}\``);
  const guildSQL = await buscarGuildPrivate(interaction.guildId);

  try { EmbedBuilder().setImage(hoistedOptions.value) }
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