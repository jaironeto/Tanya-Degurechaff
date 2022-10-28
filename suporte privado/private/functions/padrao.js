const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const sendChannelClient = require('../../../public/functions/sendChannelClient');
const privateMysql = require('../../../public/database/private')

async function padrao(interaction, guildSQL) {
  // CRIA O BOTAO
  const row = new ActionRowBuilder()
  .addComponents(new ButtonBuilder().setCustomId('fechar')
  .setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger))

  // ENVIA A MENSAGEM PRO CANAL GERAL
  // INICIALIZA A REPLY DO USER 
  // ATUALIZA O COMPONENT/EMBED DO USER
  const messageGuild = await sendChannelClient(interaction, guildSQL.channel,
     `O usuario <@${interaction.user.id}> solicitou suporte`)

  await privateMysql.user({ _status: 'ativo', replyGuildMessage: messageGuild.id, 
  _user: interaction.user.id, replyPrivateMessage: interaction.message.id, 
  replyGuildChannel: messageGuild.channelId })
  
  await interaction.editReply({ components: [row] });
  await sendChannelClient(interaction, interaction.channelId, "suporte iniciado com sucesso!")
}
   //
module.exports = {
  padrao
}