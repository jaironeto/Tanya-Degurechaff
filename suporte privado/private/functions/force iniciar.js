const privateMysql = require('../../../public/database/private');
const sendDMClient  = require('../../../public/functions/sendDMClient');

async function forceIniciar(message, User, mentionId, discord) {

  if (message.channel.type === 11) { 
    message.channel.send('você não pode iniciar um suporte a partir de uma thread')
    return
     }

  // USA O MENTIONID PARA CRIAR UMA DM, USAR O PRIVATEMSQL PARA ATUALIZAR OS DADOS
  // E POR FIM ENVIA A MENSAGEM PARA O USUARIO NA DM E TAMBEM NA GUILD   
  const thread = await message.startThread({ name: await discord.clientUsername(User?.user) });
  const threadMessage = await thread.send(`Suporte iniciado com sucesso para <@${await discord.clientUser(User?.user)}>`)

  await privateMysql.user({
    _user: mentionId, replyGuildMessage: threadMessage.id,
    replyGuildChannel: thread.id, staff: message.author.id
  })

  await sendDMClient(message, mentionId, `**${discord.username} iniciou/reiniciou o suporte!**`)
}

module.exports = {
  forceIniciar
}