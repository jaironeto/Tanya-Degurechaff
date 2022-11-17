const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Webhook } = require('discord.js');
//const { _deleteUserPrivate, buscarUserPrivate } = require('../data/private');
const Continued = require('../../public/error/continued');
const type = require('../../public/security/Security_verifyArguments');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');

module.exports = async function buttonFechar(interaction) {

  const embed = new EmbedBuilder().setTitle("Suporte Encerrado").setDescription("Obrigado por nós procurar, estaremos sempre aqui").setImage('https://i.imgur.com/28aCSiH.gif')
  await interaction.editReply({ embeds: [embed], components: [] })

  const dadosSQL = await buscarUserPrivate(interaction.user.id);
  type.isUndefined(interaction.user.id);
  type.isTrue(dadosSQL?.get('status') === 'ocioso');

  await _deleteUserPrivate(interaction.user.id)
}