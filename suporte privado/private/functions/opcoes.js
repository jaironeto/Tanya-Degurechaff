const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const sendChannelClient = require('../../../public/functions/sendChannelClient')
const sendDMClient = require('../../../public/functions/sendDMClient')
const privateMysql = require('../../../public/database/private')

async function opcoes(interaction, dadosSQL, opcao) {

  // CRIA O COMPONENT COM SOMENTE OPÇÃO DE ENCERRAR
  // ENVIA A MENSAGEM PRO CANAL ESPECIFICO OU MAIS GERAL
  // INICIALIZA A REPLY DO USER NO BANCO DE DADOS
  // ATUALIZA O COMPONENET/EMBED E POR FIM ENVIA MENSAGEM NA GUILD E DM
  const guildSQL = await dadosSQL.guildFetch(dadosSQL?.user?.guild);

  const msgReply = await sendChannelClient(interaction,
    guildSQL?.['canal'+opcao.at(-1)],
    `O usuario <@${interaction.user.id}> solicitou suporte`);

  await privateMysql.user({
    _status: 'ativo', replyGuildMessage: msgReply.id,
    _user: interaction.user.id, replyPrivateMessage: interaction.message.id,
    replyGuildChannel: msgReply?.channelId
  });

  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger))
  await sendDMClient(interaction, interaction.user.id, "suporte iniciado com sucesso!")
  await interaction.editReply({ components: [row] });
}

module.exports = {
  opcoes
}