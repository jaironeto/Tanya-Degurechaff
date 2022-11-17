const { ActionsManager, RequestManager, BaseInteraction, PermissionsBitField, Events, Client, Options, Partials, LimitedCollection, Collection, GatewayIntentBits, Message } = require('discord.js'); //Intents, GatewayIntentBits
const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Continued = require('./public/error/continued');
const welcome = require('./welcome/myMemberAdd');
const Partner = require('./partner/partner');
const Disboard = require('./disboard/disboard');
const { predizer } = require('./suporte privado/data/private');
const InteractionError = require('./public/error/InteractionError');
const partnerTimeout = require('./timeout/partnerTimeout');
const guildPrivate = require('./suporte privado/data/guildPrivate');
const embed = new EmbedBuilder().setTitle('Deus lo vult').setDescription('Ocorreu um erro nessa interação').setImage('https://i.imgur.com/4dKkUms.gif').setTimestamp();
const ManageMessages = PermissionsBitField.Flags.ManageMessages;
const interaction = require('./interaction.js');
const messagecreate = require('./messagecreate');
global.guildPrivateRAM = [];
global.userPrivateRAM = [];
global.predizerRAM = [];
global.partnerRAM = []
global.timeInteraction = 0;
global.timeMessage = 0;
global.embedPrivateFinalizar = new EmbedBuilder().setTitle("Suporte Encerrado").setDescription("Obrigado por nós procurar, estaremos sempre aqui").setImage('https://i.imgur.com/28aCSiH.gif')
global.buttonProxBlock = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary).setDisabled(true))
global.buttonProxAllow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary))
global.buttonAnterAllow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary))
global.buttonAnterBlock = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('anterior').setLabel('Anterior').setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId('iniciar').setLabel('Solicitar Suporte').setStyle(ButtonStyle.Success)).addComponents(new ButtonBuilder().setCustomId('proximo').setLabel('Próximo').setStyle(ButtonStyle.Secondary))
global.codePartner = []

//        CRIAR CLIENTE
const client = new Client({
  intents: [GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  sweepers: {
    Threads: 0, PresenceManager: 0, /* guild.presences */ ReactionManager: 0, /* message.reactions */ReactionUserManager: 0, /* reaction.users */StageInstanceManager: 0, /* guild.stageInstances */ /* channel.threads */ThreadMemberManager: 0, /* threadchannel.members */UserManager: 0, /* client.users */VoiceStateManager: 0, /* guild.voiceStates */ApplicationCommandManager: 0, /*guild.commands*/ BaseGuildEmojiManager: 0, /* guild.emojis*/ GuildBanManager: 0, /* guild.bans*/ GuildMemberManager: 0, /* guild.members*/GuildStickerManager: 0, /* guild.stickers*/GuildScheduledEventManager: 0, /* guild.scheduledEvents*/
    messages: {
      maximumSize: 1000,
      interval: 20,
      lifetime: 60,
      sweepFilter: async message => {
        if (message.author.id === client.user.id) { return true }
        else if (message.author.bot) { return false }
        else {
          try {
            const reply = new ReplyCadeia();
            await reply.fetch(message);
            return true;
          } catch (e) {
            return false
          }
        }
      },
    },
    ThreadManager: {
      maximumSize: 1000,
      interval: 20,
      lifetime: 60,
      sweepFilter: async thread => {
        thread.channel.messages.cache.find(e => e.author.id === '820752194328330261')
      }
    },
    GuildMemberManager: {
      maximumSize: 1000,
      interval: 20,
      lifetime: 60,
      sweepFilter: async member => {
        console.log(member)
        if (!!member) { return false }
        else if (member.me.bot) { return false }
        else if (member.me.permissions.has(0x0000000000002000)) { return true }
        else { return false }
      }
    },
  },

  makeCache: Options.cacheWithLimits({
    Threads: 0, PresenceManager: 0, /* guild.presences */ ReactionManager: 0, /* message.reactions */ReactionUserManager: 0, /* reaction.users */StageInstanceManager: 0, /* guild.stageInstances */ /* channel.threads */ThreadMemberManager: 0, /* threadchannel.members */UserManager: 0, /* client.users */VoiceStateManager: 0, /* guild.voiceStates */ApplicationCommandManager: 0, /*guild.commands*/ BaseGuildEmojiManager: 0, /* guild.emojis*/ GuildBanManager: 0, /* guild.bans*/ GuildMemberManager: 0, /* guild.members*/GuildStickerManager: 0, /* guild.stickers*/GuildScheduledEventManager: 0, /* guild.scheduledEvents*/
    GuildMemberManager: {
      maxSize: 1000,
    },
    ThreadManager: {
      maxSize: 1000
    },
    MessageManager: {
      maxSize: 1000,
    }
  }),
  presence: { status: 'online', activities: [{ name: 'youjo senki', type: 3, user: '820752194328330261' }] },
  failIfNotExists: false,
});

//        CLIENTE PRONTO
client.on('ready', async (client) => {

  interaction(client);
  messagecreate(client);
  const timeout1 = setTimeout(() => partnerTimeout(timeout1), 3600000);
  console.log('\n\n\n\nConnect Discord.js\n\n\n\n\n');
  // client.presence.set({ status: 'online', activities: [{ name: 'youjo senki', type: 3 }] })
  setInterval(async () => await privateMysql.predizer(client), 3600000);
  // await privateMysql.predizer(client);
});

//        guildMemberAdd
client.on(Events.GuildMemberAdd, async (member) => {
  if (member === undefined) { return }
  await welcome(member);
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

process.on('exit', async e => {

  console.log(`\n\nconexao abortada ${[e]}`)
  process.abort();
})

process.on('uncaughtException', async e => {

  if (e instanceof AbortController) { process.exit(1) }

  console.log('\n\n')
  console.error(`ERROR NODE.JS!\t[${e?.name}]\n\n${e?.stack}`)
})

//        LOGIN DISCORD
client.login('ODIwNzUyMTk0MzI4MzMwMjYx.GJsJLu.Kz-k6E2qa-LnMDxrhDY1rV-ceVj2aRg_f0Oa58');