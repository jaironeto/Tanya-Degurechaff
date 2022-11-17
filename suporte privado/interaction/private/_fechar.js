const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Continued  = require('../../../public/error/continued');
const _deleteUserPrivate = require('../../data/_deleteUserPrivate');

module.exports = async function _fechar(interaction) {
  
  try {
    await _deleteUserPrivate(interaction?.user?.id)
  } catch (e) {
    if (e instanceof Continued) { ; } /*empty*/ else { throw e }
  }

  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Secondary).setDisabled(true));
  const embed = new EmbedBuilder().setTitle("Suporte Encerrado").setDescription("Obrigado por nós procurar, estaremos sempre aqui").setImage("https://i.imgur.com/28aCSiH.gif")

  await interaction.editReply({ embeds: [embed], components: [row] })
}