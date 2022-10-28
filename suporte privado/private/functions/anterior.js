const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Webhook } = require('discord.js');
const DadosDiscord = require('../../../public/class/DadosDiscord');
const privateMysql = require('../../../public/database/private')

async function anterior(interaction, dadosSQL) {
  const User = dadosSQL.user;
  const discord = new DadosDiscord(interaction);
  const embed = new EmbedBuilder();

  if (!User) { return }
  if (User.opcoes.length === 0) { return }

  const rowBlock = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary))
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary))
  const index = User.opcoes.findIndex(e => e.guild === User.guild)
  if (index === -1) { return false }
  if (User.opcoes[index - 1] === undefined) { return false }

  const guildName = await discord.clientGuildUsername(User.opcoes[index -1].guild);
  const guildSQL = await dadosSQL.guildFetch(User.opcoes[index -1].guild);
  try { embed.setTitle(guildName).setDescription(guildSQL.message).setImage(guildSQL.image).setTimestamp().setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` })} 
  catch (e) { embed.setTitle(guildName).setDescription('sem texto').setImage(`https://i.imgur.com/yTqTAM9.gif`).setTimestamp().setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` }); }


  if (User[index - 2]) {
    await interaction.editReply({
      components: [row],
      embeds: [embed]
    })
  }
  else {
    await interaction.editReply({
      components: [rowBlock],
      embeds: [embed]
    })
  }

  await privateMysql.user({ _user: interaction.user.id, _guild: User.opcoes[index - 1].guild, _status: 'ocioso', _opcoes: User.opcoes })
  return true;
}

module.exports = {
  anterior
}