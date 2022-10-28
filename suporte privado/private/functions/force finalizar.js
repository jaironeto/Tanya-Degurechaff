const privateMysql = require('../../../public/database/private');
const sendDMClient  = require('../../../public/functions/sendDMClient');

async function forceFinalizar(message, User, mentionId, discord) {

    await privateMysql._deleteUser(User?.user);
    await sendDMClient(message, mentionId, `**${discord.username} encerrou o suporte!**`)
    await message.channel.send(`Suporte forçado a finalizar com sucesso!`)
}

module.exports = {
  forceFinalizar
}