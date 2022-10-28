const { Continued } = require('../../../public/error/continued');
const security = require('../../../public/security/Security_verifyArguments');

module.exports = async function SecurityPrivate(message, dadosSQL) {

  security.APIDMChannel(message.channel);
  if (dadosSQL.user.replyGuildmessage === null) { throw new Continued() }
  if (dadosSQL.user.replyGuildChannel === null) { throw new Continued() }
  security.isFalse(dadosSQL.user?.status === 'ativo');
}