const { PermissionsBitField, Events, Client, Options, Partials, LimitedCollection, Collection, GatewayIntentBits } = require('discord.js'); //Intents, GatewayIntentBits

const privateMysql = require('./public/database/private.js')
const SuportePrivado = require('./suporte privado/suporte privado')
const { Continued } = require('./public/error/continued.js')
const Partner = require('./partner/partner');
const Disboard = require('./disboard/disboard')

var codePartner = [];
const ManageMessages = PermissionsBitField.Flags.ManageMessages;

//        CRIAR CLIENTE
const client = new Client({
  intents: [GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  makeCache: Options.cacheWithLimits({
    GuildManager: 100000, // client.guilds
    GuildMemberManager: 500000, // guild.members
    MessageManager: 100000, // channel.messages
    ChannelManager: 100000, // client.channels
    GuildInviteManager: 5000
  }),
});

//        CLIENTE PRONTO
client.once('ready', async (client) => {
  console.log('\n\n\nReady!\n\n\n');
  client.presence.set({ status: 'online', activities: [{ name: 'youjo senki', type: 3 }] })

  setInterval(async () => await privateMysql.predizer(client), 3600000);
  // await privateMysql.predizer(client);
});

//        INTERACTION
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction === undefined) { return }
  if (!interaction?.isRepliable()) { return }
  if (interaction.channel.type === 2 && !interaction?.member?.permissions?.has(ManageMessages)) { return }

  await Disboard.interaction(interaction);
  await SuportePrivado.interaction(interaction)
  await Partner.interaction(interaction);
});

//        MESSAGECREATE
client.on(Events.MessageCreate, async (message) => {
  if (message === undefined) { return }
  if (message.channel.type === 2 && !message.member.permissions.has(ManageMessages)) { return }

  await Partner.messageCreate(message, codePartner);
  await SuportePrivado.messageCreate(message);
  await Disboard.messageCreate(message);
});

//        guildMemberAdd
client.on(Events.GuildMemberAdd, async (member) => {
  if (member === undefined) { return }
  await SuportePrivado.guildMemberAdd(member);
});

//        guildDelete
client.on(Events.GuildDelete, async (guild) => {
  if (guild === undefined) { return }
  await SuportePrivado.predizerGuildDelete(guild);
});

//        guildMemberRemove
client.on(Events.GuildMemberRemove, async (member) => {
  if (member === undefined) { return }
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
client.login('token');