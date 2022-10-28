const privateMysql = require('../../../public/database/private');
const sendDMClient  = require('../../../public/functions/sendDMClient');

async function finalizar(message, User, mentionId, discord) {

  if (User?.staff === message?.author?.id) {
    await privateMysql._deleteUser(User.user);
    await sendDMClient(message, mentionId, `**${discord.username} encerrou o suporte!**`)
    await message.channel.send(`Suporte finalizado com sucesso!`)
  }
  else {
    await message.channel.send(`Você não pode encerrar um suporte não iniciado por você, para isso use \`**FINALIZAR**\``)
  }
}

module.exports = {
  finalizar
}