const ReplyCadeia = require('../../public/class/ReplyCadeia');
const sendDM = require('../../public/functions/sendDMClient');
const SecurityReply = require('../private/security/SecurityReply');

module.exports = async function reply(message, dadosSQL) {
  // PEGA O ID DO CARGO MENCIONADO NA CADEIA DE REFERENCE
  // CRIA UMA DM COM ESSE ID E ENVIA A MENSAGEM COM SEND
  // RETORNA SE O REFERENCEREPLY NAO RETORNAR NADA
  try {
    // const dadosDiscord = new DadosDiscord(message)
    const reply = new ReplyCadeia(); await reply.fetch(message);
    const User = await dadosSQL.userFetch(reply.userId);
    await SecurityReply(message, User, reply);

    await sendDM(message, reply.userId, message.content);

    if (reply.MessageSuportObject) {
      const messageReply = reply.MessageSuportObject;
      const date = `ultima mensagem enviada ${message.createdAt.getDate().toString().padStart(2, '0')}/${message.createdAt.getMonth().toString().padStart(2, '0')}/${message.createdAt.getFullYear().toString().padStart(2, '0')} ás ${message.createdAt.getHours().toString().padStart(2, '0')}:${message.createdAt.getMinutes().toString().padStart(2, '0')}:${message.createdAt.getSeconds().toString().padStart(2, '0')}`;
      await messageReply.edit(`${date}\nSuporte iniciado com sucesso para <@${reply.userId}>`).toString();
    }
  } catch (e) {
    if (e?.name === 'continued') { ; /*console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO\n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
}

// parei aqui