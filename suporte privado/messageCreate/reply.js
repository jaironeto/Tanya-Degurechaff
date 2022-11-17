const ReplyCadeia = require('../../public/class/ReplyCadeia');
const sendDM = require('../../public/functions/sendDMClient');
const SecurityReply = require('../security/SecurityReply');
const type = require('../../public/security/Security_verifyArguments');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');
const userPrivate = require('../data/userPrivate');
const Continued = require('../../public/error/continued');

module.exports = async function reply(message) {
  // PEGA O ID DO CARGO MENCIONADO NA CADEIA DE REFERENCE
  // CRIA UMA DM COM ESSE ID E ENVIA A MENSAGEM COM SEND
  // RETORNA SE O REFERENCEREPLY NAO RETORNAR NADA
  try {
    const reply = new ReplyCadeia(); await reply.fetch(message);
    if (!reply) { return }

    const userSQL = await buscarUserPrivate(reply.userId);
    if (userSQL?.get('replyGuildJSON')?.channelId !== message.channelId) { return }

    try {
      await userSQL?.get('sendPrivateJSON').channel.send(message.content);
    } catch (e) {
      const alvo = await message.client.channels.fetch(userSQL?.get('sendPrivateJSON').channelId);
      const msg = await alvo.send(message.content);

      await userPrivate({
        status: 'ativo', sendPrivateJSON: msg, user: message.author.id
      }, userSQL);
    }
  } catch (e) {
    if (e instanceof Continued) {
      await message.channel.send("ocorreu um erro no envio de mensagem, mas nada grave. Verifique a cadeia de reply!");
      return;
    }
    await message.channel.send('ocorreu um erro no envio da mensagem, portanto esse suporte sera encerrado');
    await _deleteUserPrivate(message.author.id);
    throw e;
  }
}