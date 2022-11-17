const { PermissionsBitField, Events, Message } = require('discord.js'); //Intents, GatewayIntentBits
const SuportePrivado = require('./suporte privado/suporte privado');
const Partner = require('./partner/partner');
const Disboard = require('./disboard/disboard');
const ManageMessages = PermissionsBitField.Flags.ManageMessages;

module.exports = function messagecreate(client) {

  client.on(Events.MessageCreate, async (message) => {
    if (message?.author?.id === '820752194328330261') { return }
    if (message instanceof Message === false) { return }
    if (message.channel.type === 2 && !message.member.permissions.has(ManageMessages)) { return }

    console.time('request');
    console.timeEnd('request');
    const time = global.timeMessage === 10 ? global.timeMessage : global.timeMessage++;
    console.time(`messageCreate ${time}`);

    const p1 = Partner.messageCreate(message);
    const p2 = SuportePrivado.messageCreate(message);
    const p3 = Disboard.messageCreate(message);

    Promise.all([p1, p2, p3])
      .then(e => {
        console.log('\n')
        console.timeEnd(`messageCreate ${time}`)
      })
      .catch(e => {
        console.log('error de desenvolvimento:')
        throw e;
      });
  });
}