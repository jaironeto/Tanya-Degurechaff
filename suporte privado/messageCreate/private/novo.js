const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const interaction = require('../../../interaction');
//const { buscarPredizer, buscarGuildPrivate, userPrivate } = require('../../data/private')
const type = require('../../../public/security/Security_verifyArguments');
const buscarGuildPrivate = require('../../data/buscarGuildPrivate');
const buscarPredizer = require('../../data/buscarPredizer');
const userPrivate = require('../../data/userPrivate');
module.exports = async function novo(Message) {

  const Predizer = await buscarPredizer(Message.author.id, Message)
  type.isUndefined(Predizer);
  type.isUndefined(Predizer[0])

  const Filtro = []
  const embed = new EmbedBuilder()
  let row;
  var lastMsg = 0;

  for (let _guild of Predizer) {
    const Guild = await buscarGuildPrivate(_guild?.get('guild'))

    if (!Guild) { continue }

    if (_guild?.lastMsg > lastMsg) { Filtro.unshift(Guild) }
    else { Filtro.push(Guild) }
  }

  if (Filtro.length === 0) { return false }
  if (Filtro.length === 1) { row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary).setDisabled(true)) }
  else { row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary)) }

  const guildAPI = await Message.client.guilds.fetch(Filtro[0]?.get('guild'));
  type.isUndefined(guildAPI);

  try { embed.setTitle(guildAPI.name).setDescription(Filtro[0]?.get('message')).setImage(Filtro[0]?.get('image')).setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${Message.client.user.avatarURL()}` }) }
  catch (e) { embed.setTitle(guildAPI.name).setDescription("text invalid").setImage("https://i.imgur.com/yTqTAM9.gif").setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${Message.client.user.avatarURL()}` }) }

  const msg = await Message.channel.send({ embeds: [embed], components: [row] })

  await userPrivate({
    user: Message.author.id, guild: Filtro[0].get('guild'), status: 'ocioso',
    opcoes: Filtro, username: Message.author.username+Message.author.discriminator,
    sendPrivateJSON: msg
  })

  return true;
}