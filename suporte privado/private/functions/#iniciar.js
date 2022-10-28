const privateMysql = require('../../../public/database/private');
const sendDMClient = require('../../../public/functions/sendDMClient');

async function iniciar(message, User, mentionId, discord) {

  if (message.channel.type === 11) {
    message.reply('você não pode iniciar um suporte a partir de uma thread')
    return
  }

  // USA O MENTIONID PARA CRIAR UMA DM, USAR O PRIVATEMSQL PARA ATUALIZAR OS DADOS
  // E POR FIM ENVIA A MENSAGEM PARA O USUARIO NA DM E TAMBEM NA GUILD   
  if (!User?.staff) {
    const thread = await message.startThread({ name: await discord.clientUsername(User?.user) });
    const threadMessage = await thread.send(`Suporte iniciado com sucesso para <@${await discord.clientUserId(User?.user)}>`)

    await privateMysql.user({
      _user: mentionId, replyGuildMessage: threadMessage.id,
      replyGuildChannel: thread.id, staff: message.author.id
    })

    await sendDMClient(message, mentionId, `**${discord.username} iniciou o suporte!**`)
  }
  else {
    await message.editReply(`Você não pode iniciar um suporte em andamento, para isso use \`**INICIAR**\``)
  }
}

module.exports = {
  iniciar
}