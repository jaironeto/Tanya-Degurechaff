const Continued = require('../../public/error/continued');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');
const guildPrivate = require('../data/guildPrivate');
const { predizerInteraction } = require('../data/private');
const _deleteGuildPrivate = require('../data/_deleteGuildPrivate');

module.exports = async function slashConnect(interaction, hoistedOptions) {

  await interaction.editReply(`Suporte privado configurado com sucesso \`connection: ${hoistedOptions?.value}\``);

  const guildSQL = await buscarGuildPrivate(interaction.guildId);

  if (hoistedOptions.value === 'ativarPrivate') {
    if (guildSQL) { await interaction.editReply(`estar guilda já esta ativa`); return }
    await predizerInteraction(interaction);
    await guildPrivate({ guild: interaction.guildId, channel: interaction.channelId, connect: true })
    return
  } else {
    if (!guildSQL) { await interaction.editReply(`eu nem sei quem e você`); return }
    await _deleteGuildPrivate(interaction.guildId)
    return;
  }

}