const Continued = require('../../public/error/continued');
const userPrivate = require('../data/userPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');
const SecurityPrivate = require('../security/SecurityPrivate');

module.exports = async function private(message, userSQL) {

  try {
    if (userSQL?.get('status') !== 'ativo') { return }

    try {
      await userSQL.get('replyGuildJSON').reply(message.content);
    } catch (e) {
      console.log(userSQL.get('replyGuildJSON').channelId);
      const alvo = await message.client.channels.fetch(userSQL.get('replyGuildJSON').channelId);
      const msg = await alvo.send(`<@${message.author.id}>\n${message.content.slice(0, 1800)}`);

      await userPrivate({
        status: 'ativo', replyGuildJSON: msg, user: message.author.id,
      }, userSQL);
    }

  } catch (e) {
    await message.channel.send('ocorreu um erro no envio da mensagem, portanto esse suporte sera encerrado');
    await _deleteUserPrivate(message.author.id);
    throw e;
  }
}