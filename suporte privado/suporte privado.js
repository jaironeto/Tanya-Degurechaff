const inicial = require('./messageCreate/inicial');
const VerifyDatabase = require('./private/class/DadosDatabase');
const reply = require('./messageCreate/reply');
const private = require('./messageCreate/private');
const comando = require('./messageCreate/comando');
const { predizerManual, _deletePredizer, _deleteGuild } = require('../public/database/private');
const connect = require('./interaction/connect');
const message = require('./interaction/message');
const image = require('./interaction/image');
const opcao = require('./interaction/opcao');
const buttonProximo = require('./interaction/buttonProximo');
const buttonAnterior = require('./interaction/buttonAnterior');
const buttonIniciar = require('./interaction/buttonIniciar');
const buttonFechar = require('./interaction/buttonFechar');
const buttonOpcao = require('./interaction/buttonOpcao');

// AMBOS ENCERRA SE FOR UM BOT/ESSE BOT0
// NÃO TEM NECESSIDADE E PODE AJUDAR NO DESEMPENHO IGNORAR
async function interaction(interaction) {
  if (interaction.user.bot) { return }

  switch (interaction.channel.type) {
    case 1: // DM
      if (interaction.type !== 3) { return } // ButtonInteraction
      await interaction.deferUpdate()

      if (interaction?.customId === 'proximo') {
        await buttonProximo(interaction, await dadosSQL(interaction));
      } else if (interaction?.customId === 'anterior') {
        await buttonAnterior(interaction, await dadosSQL(interaction));
      } else if (interaction?.customId === 'iniciar') {
        await buttonIniciar(interaction, await dadosSQL(interaction));
      } else if (interaction?.customId === 'fechar') {
        await buttonFechar(interaction);
      } else {
        await buttonOpcao(interaction, await dadosSQL(interaction));
      }

      return; case 0: {  // GUILDTEXT
        if (interaction.type !== 2) { return }   // ChatInputCommandInteraction
        if (interaction?.options?._hoistedOptions[0]?.name === undefined) { return }
        if (interaction?.options?._subcommand !== 'private') { return }
        const hoistedOptions = interaction.options._hoistedOptions[0];
        await interaction.deferReply();

        if (hoistedOptions?.name === 'connect') {
          await connect(interaction, hoistedOptions)
        } else if (hoistedOptions?.name === 'message') {
          await message(interaction, hoistedOptions)
        } else if (hoistedOptions?.name === 'image') {
          await image(interaction, hoistedOptions)
        } else {
          await opcao(interaction, hoistedOptions);
        }
      }
  }
}

async function messageCreate(message) {
  if (message.author.bot) { return }

  switch (message.channel.type) {
    case 1:      // DM
      if (!(message.type === 19 || message.type === 0)) { return } // Reply
      if (await inicial(message, await dadosSQL(message))) { ; } // empty
      else { await private(message, await dadosSQL(message)) }

      return;
    case 11:    // GUILDPUBLICTHREAD
      if (message.type !== 19) { return } // Reply
      await reply(message, await dadosSQL(message));
      await comando(message, await dadosSQL(message));

      return;
    case 0:    // GUILDTEXT
      if (message.type !== 19) { return }  // Reply
      await comando(message, await dadosSQL(message));
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

async function dadosSQL(discord) {
  const verifyDabase = new VerifyDatabase(discord);
  const user = await verifyDabase.user();
  const guild = await verifyDabase.guild();
  return {
    user: user,
    guild: guild,
    async guildFetch(guild) {
      return await verifyDabase.guildFetch(guild)
    },
    async userFetch(user) {
      return await verifyDabase.userFetch(user);
    }
  };
}

module.exports = {
  interaction,
  messageCreate,
  guildMemberAdd,
  guildMemberRemove,
  predizerGuildDelete
}