const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const privateMysql = require('../../../public/database/private')

async function novo(Message) {

  // ORDENA O ARRAY DE GUILDS
  // VERIFICAÇÃO DE CONTINUIDADE
  const Predizer = await privateMysql.buscarPredizer(Message.author.id)
  const Filtro = []
  var lastMsg = 0;

  if ( Predizer === undefined) { return}
  if (!Predizer[0]) { return }

  // ORDENA O ARRAY DE GUILDS
  for (let _guild of Predizer) {
    const Guild = await privateMysql.buscarGuild(_guild?.dataValues?.guild)

    if (Guild === undefined) { continue }

    if (_guild?.lastMsg > lastMsg) { Filtro.unshift(Guild) }
    else { Filtro.push(Guild) }
  }

  // VERIFICAÇÃO DE CONTINUIDADE DO ARRAY
  // CRIA OS BOTOES COM O PROXIMO DESATIVADO OU NÃO
  // CRIA A MENSAGEM COM OS DO BANCO DE DADOS RELACIONAL
  if (Filtro.length === 0) { return false }

  let row = undefined;
  if (Filtro.length === 1) { row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary).setDisabled(true)) }
  else { row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary)) }

  const embed = new EmbedBuilder()
  try {
    embed.setTitle(`${await Message.client.guilds.fetch(Filtro[0]?.guild.toString())}`).setDescription(`${Filtro[0]?.message.toString()}`).setImage(`${Filtro[0]?.image.toString()}`).setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${Message.client.user.avatarURL()}` });
  } catch (e) {
    embed.setTitle(`${await Message.client.guilds.fetch(Filtro[0]?.guild.toString())}`).setDescription(`${Filtro[0]?.message.toString()}`).setImage(`https://i.imgur.com/yTqTAM9.gif`).setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${Message.client.user.avatarURL()}` });
  }

  // ENVIA A MENSAGEM
  // ATUALIZA OS DADOS
  // RETORNA TRUE E INTERROPE O SWITCH/IF
  await privateMysql.user({ _user: Message.author.id, _guild: Filtro[0].guild, _status: 'ocioso', _opcoes: Filtro })
  await Message.channel.send({ embeds: [embed], components: [row] })

  return true;
}

module.exports = {
  novo
}