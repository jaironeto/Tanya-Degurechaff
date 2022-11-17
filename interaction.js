const { BaseInteraction, PermissionsBitField, Events, Client, Options, Partials, LimitedCollection, Collection, GatewayIntentBits, Message } = require('discord.js'); //Intents, GatewayIntentBits
const { EmbedBuilder } = require('discord.js');
const Partner = require('./partner/partner');
const Disboard = require('./disboard/disboard');
const InteractionError = require('./public/error/InteractionError');
const partnerTimeout = require('./timeout/partnerTimeout');
const embed = new EmbedBuilder().setTitle('Deus lo vult').setDescription('Ocorreu um erro nessa interação').setImage('https://i.imgur.com/4dKkUms.gif').setTimestamp();
const console = require('node:console');
const _deleteUserPrivate = require('./suporte privado/data/_deleteUserPrivate');
const suportePrivado = require('./suporte privado/suporte privado');
global.idle = []

module.exports = function interaction(client) {

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction instanceof BaseInteraction === false) { return }
    if (interaction.user.bot) { return }

    console.time('request')
    console.timeEnd('request')
    const time = global.timeInteraction === 10 ? global.timeInteraction = 1 : global.timeInteraction++
    console.time(`interaction[${time}]`)
    console.log('\global')
    console.log(global.idle)

    for (let index of global.idle) {
      if (index === interaction.user.id) {
        await interaction.reply({ content: 'Aguarde o bot terminar sua ultima interação', ephemeral: true })
        return
      }
    }

    if (interaction.isButton()) { await interaction.deferUpdate({ ephemeral: true }) }
    else { await interaction.deferReply({ ephemeral: true }) }

    const p1 = Disboard.Interaction(interaction, interaction.user.id);
    const p2 = suportePrivado.Interaction(interaction, interaction.user.id);
    const p3 = Partner.Interaction(interaction, interaction.user.id);
    global.idle.push(interaction.user.id);

    Promise.allSettled([p1, p2, p3])
      .then(resolve => {
        global.idle = global.idle
          .filter(user => user !== resolve[0].value);
      })
      .catch(async e => {
        console.log(`\n\nERROR INTERACTION: ${e?.name}\n${e?.stack}`)
        await _deleteUserPrivate(interaction?.user?.id)
        global.idle = global.idle.filter(user => user !== interaction.user.id);

        if (e instanceof InteractionError) {
          await interaction.channel.send('quaisquer suporte foram forçados a encerrar por causa do erro')
          if (interaction.isButton()) { await interaction.editReply({ embeds: [embed], components: [] }) }
          else { await interaction.editReply('❌falha no comando') }
        } else {
          embed.setImage('https://i.imgur.com/1y7H6A7.gif')
          if (interaction.isButton()) { await interaction.editReply({ embeds: [embed], components: [] }) }
          else { await interaction.editReply('❓falha no comando') }
          throw e;
        }
      });
  });
}