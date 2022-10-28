const { Client, Options, Partials, LimitedCollection, Collection, GatewayIntentBits } = require('discord.js'); //Intents, GatewayIntentBits

const privateMysql = require('./public/database/private.js')
const SuportePrivado = require('./suporte privado/suporte privado.js')
const { Continued } = require('./public/error/continued.js')

//        CRIAR CLIENTE
const client = new Client({
  intents: [GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  makeCache: Options.cacheWithLimits({
    GuildManager: 100000, // client.guilds
    GuildMemberManager: 100000, // guild.members
    MessageManager: 100000, // channel.messages
    ChannelManager: 100000, // client.channels
  }),
});

//        CLIENTE PRONTO
client.once('ready', async (client) => {
  console.log('\n\n\nReady!\n\n\n');
  client.presence.set({ status: 'online', activities: [{ name: 'peaky blinders', type: 3 }] })

  setInterval(async () => await privateMysql.predizer(client), 3600000)
  // await privateMysql.predizer(client);
});

//        INTERACTION
client.on('interactionCreate', async (interaction) => {
  await SuportePrivado.interaction(interaction)
});

//        MESSAGECREATE
client.on('messageCreate', async (message) => {
  await SuportePrivado.messageCreate(message)
});

//        guildMemberAdd
client.on('guildMemberAdd', async (member) => {
  await SuportePrivado.guildMemberAdd(member);
});

//        guildCreate
client.on('guildCreate', async (guild) => {
  await SuportePrivado.predizerGuildAdd(guild);
});

//        guildDelete
client.on('guildDelete', async (guild) => {
  await SuportePrivado.predizerGuildDelete(guild);
});

//        guildMemberRemove
client.on('guildMemberRemove', async (member) => {
  await SuportePrivado.guildMemberRemove(member);
});

//        TRATAMENTO DE ERROS DO NODE.JS OU API DISCORD.JS
client.on('error', (e) => {
  console.error(`\n\n\nERROR Discord.js!\nline ${e?.columnNumber}: ${e}\n\n${e?.stack}`)
});
process.on('uncaughtException', e => {
  if (e instanceof AbortController) {
    process.exit();
  }
  console.error(`\n\n\nERROR NODE.JS!\nline ${e?.columnNumber}: ${e}\n\n${e?.stack}`)
})

//        LOGIN DISCORD
client.login('alterar');

