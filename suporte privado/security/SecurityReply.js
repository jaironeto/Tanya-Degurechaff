const DadosDiscord = require('../../public/class/DadosDiscord');
const Continued = require('../../public/error/continued');
const type = require('../../public/security/Security_verifyArguments');

// VERIFICAÇÃO INICIA SE A MENSAGEM NAO E UM COMANDO
// SE QUEM INVOCOU NAO E UM BOT E SE O TIPO DE CANAL E UMA THREAD
module.exports = async function typeReply(message, User, Reply) {
 
  const discord = new DadosDiscord(message)
  //type.isFalse(User?.replyGuildJSON === Reply.messageId);
  type.isFalse(User?.guild === discord.guildId);
  type.isFalse(User?.status === 'ativo');
  type.isFalse(User?.staff === discord.userId)
} 