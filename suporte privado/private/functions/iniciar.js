const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { padrao } = require('./padrao');
const fetchClientGuild = require('../../../public/functions/fetchClientGuild');

async function iniciar(interaction, dadosSQL) {
  const guildSQL = await dadosSQL.guildFetch(dadosSQL?.user?.guild);
  const guildDiscord = await fetchClientGuild(interaction, guildSQL?.guild)
  const arrayOpcao = [guildSQL?.opcao1, guildSQL?.opcao2, guildSQL?.opcao3, guildSQL?.opcao4]
  const row = new ActionRowBuilder(); const embed = new EmbedBuilder();

  // CRIA OS COMPONENTES PERSONALIZADO CASO TENHA OU JA INICIA O SUPORTE
  if (arrayOpcao[0] !== null || arrayOpcao[1] !== null || arrayOpcao[2] !== null || arrayOpcao[3] !== null) {
    let index = 0;
    for (var opcao of arrayOpcao) {
      index++;
      if (opcao == undefined) { continue }
      row.addComponents(new ButtonBuilder().
        setCustomId(`opcao${index}`).setLabel(opcao).setStyle(ButtonStyle.Secondary))
    }
    // ANEXA A SAIDA PADRAO DE ENCERRAR
    row.addComponents(new ButtonBuilder()
      .setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger))


    // CRIA A MENSAGEM COM USO DO BANCO DE DADOS RELACIONAL, PODE OCORRE ERROR NA IMAGEM E PORTANTO TEM A OPÇÃO PADRÃO
    try {
      embed.setTitle(guildDiscord.name).setDescription(guildSQL.message)
        .setImage(guildSQL.image).setTimestamp()
        .setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` });
    } catch (e) { embed.setTitle(guildDiscord.name).setDescription('sem texto').setImage(`https://i.imgur.com/yTqTAM9.gif`).setTimestamp().setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` }); }


    // ATUALIZA A MENSAGEM
    await interaction.editReply({ embeds: [embed], components: [row] })
  }
  else {
    await padrao(interaction, guildSQL);
  }

}

module.exports = {
  iniciar
}