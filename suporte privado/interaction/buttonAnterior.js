const type = require('../../public/security/Security_verifyArguments');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Webhook } = require('discord.js');
const DadosDiscord = require('../../public/class/DadosDiscord');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const userPrivate = require('../data/userPrivate');

module.exports = async function buttonAnterior(interaction) {

  const userSQL = await buscarUserPrivate(interaction.user.id);
  type.isUndefined(userSQL);
  type.isTrue(userSQL?.get('opcoes').length === 0);

  const index = userSQL?.get('opcoes').findIndex(e => e?.guild === userSQL?.get('guild'));
  type.isTrue(index === -1);

  const opcoesSQL = userSQL?.get('opcoes');
  type.isUndefined(opcoesSQL?.at(index - 1));

  const guildSQL = await buscarGuildPrivate(opcoesSQL.at(index - 1)?.guild);
  type.isUndefined(guildSQL);

  const discord = new DadosDiscord(interaction);
  const guildName = await discord.clientGuildUsername(guildSQL.guild);
  const embed = new EmbedBuilder().setTitle(guildName).setDescription(guildSQL.message).setImage(guildSQL.image).setTimestamp().setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` });

  if (index - 2 >= 0) {
    await interaction.editReply({
      components: [global.buttonAnterAllow],
      embeds: [embed]
    });
  } else {
    await interaction.editReply({
      components: [global.buttonAnterBlock],
      embeds: [embed]
    });
  }

  await userPrivate({
    user: interaction.user.id,
    guild: opcoesSQL.at(index - 1).guild, status: 'ocioso'
  }, userSQL)
} 