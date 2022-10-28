const DadosDiscord = require('../../../public/class/DadosDiscord.js');
const { Continued } = require('../../../public/error/continued');
const Security = require('../../../public/security/Security_verifyArguments');

module.exports = async function SecurityReply(message, User, reply) {
  // VERIFICAÇÃO INICIA SE A MENSAGEM NAO E UM COMANDO
  // SE QUEM INVOCOU NAO E UM BOT E SE O TIPO DE CANAL E UMA THREAD
  if (message.content.toLowerCase() === 'iniciar' ||
    message.content.toLowerCase() === 'finalizar' ||
    message.content.toLowerCase() === 'status' ||
    message.content === '**FINALIZAR**' ||
    message.content === '**INICIAR**') { throw new Continued() }

  const discord = new DadosDiscord(message)
  Security.isFalse(User?.replyGuildMessage === reply.messageId);
  Security.isFalse(User?.guild === discord.guildId);
  Security.isFalse(User?.status === 'ativo');

  try { Security.isFalse(User?.staff === discord.userId) }
  catch (e) {
    if (e instanceof Continued) {
      message.reply(`Você não pode responder a um suporte o qual não iniciou, use antes \`iniciar\`  \`**INICIAR**\``)
      throw new Continued();
    } else throw e;
  }

  // PEGA O ID DO CARGO MENCIONADO NA CADEIA DE REFERENCE
  // CRIA UMA DM COM ESSE ID E ENVIA A MENSAGEM COM SEND
  // RETORNA SE O REFERENCEREPLY NAO RETORNAR NADA
} 