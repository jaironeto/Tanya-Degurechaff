const SecurityVeirfy = require('../../public/security/Security_verifyArguments')
const Continued = require('../../public/class/Continued');

module.exports = async function SecurityInicialAsync(message) {
  SecurityVeirfy.isBot(message);
  SecurityVeirfy.APIDMChannel(message);

  if (message.content.length > 1900) {
    await message.reply("message Invalid");
    throw new Continued(SecurityInicialAsync.name);
  }
}