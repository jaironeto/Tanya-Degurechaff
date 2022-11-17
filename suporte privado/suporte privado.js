const inicial = require('./messageCreate/inicial');
const reply = require('./messageCreate/reply');
const private = require('./messageCreate/private');
const { predizerManual, _deletePredizer, _deleteGuild } = require('./data/private');
const buttonProximo = require('./interaction/buttonProximo');
const buttonAnterior = require('./interaction/buttonAnterior');
const buttonIniciar = require('./interaction/buttonIniciar');
const buttonFechar = require('./interaction/buttonFechar');
const buttonOpcao = require('./interaction/buttonOpcao');
const comandoFinalizar = require('./interaction/comandoFinalizar');
const comandoIniciar = require('./interaction/comandoIniciar');
const comandoStatus = require('./interaction/comandoStatus');
const slashMessage = require('./interaction/slashMessage');
const slashImage = require('./interaction/slashImage');
const slashOpcao = require('./interaction/slashOpcao');
const slashDisable = require('./interaction/slashDisable');
const Continued = require('../public/error/continued');
const InteractionError = require('../public/error/InteractionError');
const buscarUserPrivate = require('./data/buscarUserPrivate');
const { baseInteraction } = require('discord.js')

// AMBOS ENCERRA SE FOR UM BOT/ESSE BOT0
// NÃO TEM NECESSIDADE E PODE AJUDAR NO DESEMPENHO IGNORAR
async function Interaction(interaction, userId) {
  if (interaction.replied) { return userId }
  if (interaction.isRepliable() === false) { return userId }

  try {
    if (interaction.user.bot) { return userId }
    switch (interaction.channel.type) {
      case 1: // DM
        if (interaction.type !== 3) { return userId } // ButtonInteraction

        if (interaction?.customId === 'proximo') {
          await buttonProximo(interaction);
        } else if (interaction?.customId === 'anterior') {
          await buttonAnterior(interaction);
        } else if (interaction?.customId === 'iniciar') {
          await buttonIniciar(interaction);
        } else if (interaction?.customId === 'fechar') {
          await buttonFechar(interaction);
        } else if (interaction?.customId === 'opcao1' || interaction?.customId === 'opcao2' || interaction?.customId === 'opcao3' || interaction?.customId === 'opcao4' || interaction?.customId === 'opcao5') {
          await buttonOpcao(interaction);
        }

        return userId;
      case 0: // GUILDTEXT
      case 12: // GuildPrivateThread
      case 11: // GuildPublicThread
        if (interaction.commandType === 1) {
          if (interaction.type !== 2) { return userId }   // ChatInputCommandInteraction
          if (interaction?.options?._hoistedOptions[0]?.name === undefined) { return userId }
          if (interaction?.options?._subcommand !== 'private') { return userId }
          const hoistedOptions = interaction.options._hoistedOptions[0];

          if (hoistedOptions?.name === 'connection') {
            await slashDisable(interaction, hoistedOptions)
          } else if (hoistedOptions?.name === 'message') {
            await slashMessage(interaction, hoistedOptions)
          } else if (hoistedOptions?.name === 'image') {
            await slashImage(interaction, hoistedOptions)
          } else if (hoistedOptions.value.slice(0, 6) === 'opcao1' || hoistedOptions.value.slice(0, 6) === 'opcao2' || hoistedOptions.value.slice(0, 6) === 'opcao3' || hoistedOptions.value.slice(0, 6) === 'opcao4' || hoistedOptions.value.slice(0, 6) === 'opcao5') {
            await slashOpcao(interaction, hoistedOptions);
          }
        }

        else if (interaction.commandType === 3) {
          if (interaction.commandName === 'finalizar') {
            await comandoFinalizar(interaction)
          } else if (interaction.commandName === 'iniciar') {
            await comandoIniciar(interaction)
          } else if (interaction.commandName === 'status') {
            await comandoStatus(interaction)
          }
        }
    }
    return userId
  } catch (e) {
    if (e instanceof Continued) { throw new InteractionError('expected', e); }
    else { throw e }
  }
}

async function messageCreate(message) {
  if (message.author.bot) { return }

  switch (message.channel.type) {
    case 1:      // DM
      if (!(message.type === 19 || message.type === 0)) { return } // Reply or Default
      const userSQL = await buscarUserPrivate(message.author.id);

      if (userSQL?.status === 'ativo') {
        await private(message, userSQL);
      } else if (userSQL?.get('status') === 'ocioso' || !userSQL) {
        await inicial(message, userSQL);
      } 
      
      return;
    case 11:    // GUILDPUBLICTHREAD
      if (message.type !== 19) { return } // Reply
      await reply(message);
  }
}

async function predizerGuildDelete(guild) {
  await _deleteGuild(guild.id); 
}
async function guildMemberAdd(member) {
  await predizerManual({ user: member.id, guild: member.guild.id })
}
async function guildMemberRemove(member) {
  await _deletePredizer({ user: member.id, guild: member.guild.id })
}

module.exports = {
  Interaction,
  messageCreate,
  guildMemberAdd,
  guildMemberRemove,
  predizerGuildDelete
}