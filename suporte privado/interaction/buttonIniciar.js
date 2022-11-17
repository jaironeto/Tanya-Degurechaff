const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const clientGuild = require('../../public/functions/clientGuild');
const type = require('../../public/security/Security_verifyArguments')
const sendChannelClient = require('../../public/functions/sendChannelClient');
const Continued = require('../../public/error/continued');
const InteractionError = require('../../public/error/InteractionError');
const userPrivate = require('../data/userPrivate');
const guildPrivate = require('../data/guildPrivate');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');

// BIFURCADO EM PADRAO/OPCOES
// CRIA OS COMPONENTES PERSONALIZADO CASO TENHA OU JA INICIA O SUPORTE      
// ANEXA A SAIDA PADRAO DE ENCERRAR
// CRIA A MENSAGEM COM USO DO BANCO DE DADOS RELACIONAL ISENTA DE ERROS
module.exports = async function buttonIniciar(interaction) {

  const userSQL = await buscarUserPrivate(interaction.user.id, interaction);
  type.isUndefined(userSQL);
  type.isTrue(userSQL?.get('replyGuildJSON'))

  const guildSQL = await buscarGuildPrivate(userSQL?.get('guild'));
  type.isUndefined(guildSQL);

  const guildDiscord = await clientGuild(interaction, guildSQL?.get('guild'));
  type.isUndefined(guildDiscord)

  const row = new ActionRowBuilder();
  const embed = new EmbedBuilder();

  const arrayOpcao = [guildSQL?.get('opcao1'), guildSQL?.get('opcao2'), guildSQL?.get('opcao3'), guildSQL?.get('opcao4'), guildSQL?.get('opcao5')]
  var index = 0;
  var msgReply;
  var msgDM
  
  if (arrayOpcao[0] !== null || arrayOpcao[1] !== null || arrayOpcao[2] !== null || arrayOpcao[3] !== null || arrayOpcao[4] !== null) {
    for (let opcao of arrayOpcao) {
      index++;
      if (opcao == undefined) { continue }
      row.addComponents(new ButtonBuilder().setCustomId(`opcao${index}`).setLabel(opcao).setStyle(ButtonStyle.Secondary));
    }

    embed.setTitle(guildDiscord.name).setDescription(guildSQL?.get('message')).setImage(guildSQL?.get('image')).setTimestamp().setFooter({ text: 'Esse bot e publico e não se responsabiliza pelas mensagens', iconURL: `${interaction.client.user.avatarURL()}` });
    await interaction.editReply({ embeds: [embed], components: [row] })
  } else {
    try {
      if (!interaction.isRepliable()) { return }
      row.addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger))
      await interaction.editReply({ components: [row] });
      msgReply = await sendChannelClient(interaction, guildSQL.get('channel'), `O usuario <@${interaction.user.id}> solicitou suporte`);
      msgDM = await interaction.channel.send("suporte iniciado com sucesso!");

      await userPrivate({
        status: 'ativo', replyGuildJSON: msgReply, user: interaction.user.id,
      }, userSQL);

    } catch (e) {
      if (userSQL) { await _deleteUserPrivate(userSQL.get('user')) }
      await msgReply.delete();
      await msgDM.delete();
      throw e;
    }
  }
} 