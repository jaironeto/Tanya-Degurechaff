const inicial = require('./messageCreate/inicial');
const opcaoComponentDM = require('./interaction/opcaoComponentDM');
const VerifyDatabase = require('./private/class/DadosDatabase');
const reply = require('./messageCreate/reply');
const private = require('./messageCreate/private');
const comando = require('./messageCreate/comando');
const config = require('./interaction/config');
const { predizerManual, _deletePredizer, predizerGuildAd, _deleteGuild } = require('../public/database/private');

// AMBOS ENCERRA SE FOR UM BOT/ESSE BOT
// NÃO TEM NECESSIDADE E PODE AJUDAR NO DESEMPENHO IGNORAR
async function interaction(interaction) {
  if (interaction.user.bot) { return }

  switch (interaction.channel.type) {
    // DM
    case 1: {
      switch (interaction.type) {
        case 3: // ButtonInteraction
          await interaction.deferUpdate()
          await opcaoComponentDM(interaction, await dadosSQL(interaction));
          return
        case 2: // ChatInputCommandInteraction
          return
      }
    } return;

    // GUILDTEXT
    case 0: {
      switch (interaction.type) {
        case 2:  // ChatInputCommandInteraction
          await interaction.deferReply();
          await config(interaction);
          return;
        case 3:  // COMANDO DE BARRA
          return;
      }
    } return;
  }
}

async function messageCreate(message) {
  if (message.author.bot) { return }

  switch (message.channel.type) {
    // DM
    case 1: {
      switch (message.type) {
        case 0: // Default
        case 19: // Reply
          if (await inicial(message, await dadosSQL(message))) { ; } // empty
          else { await private(message, await dadosSQL(message)) }
      }
    } return;

    // GUILDPUBLICTHREAD
    case 11: {
      switch (message.type) {
        case 19:  // Reply
          await reply(message, await dadosSQL(message));
          await comando(message, await dadosSQL(message));
      }
    } return;

    // GUILDTEXT
    case 0: {
      switch (message.type) {
        case 19:  // Reply
          await comando(message, await dadosSQL(message));
      }
    }
  }
}

async function predizerGuildAdd(guild) {
  await predizerGuildAd(guild);
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
  predizerGuildAdd,
  predizerGuildDelete
}