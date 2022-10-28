const SecurityPrivate = require('../private/security/SecurityPrivate');

module.exports = async function private(Message, dadosSQL) {

  // VERIFICA SE A MENSAGEM E DE UM BOT, E SE E ENVIADO NO PRIVADO
  // VERIFICA A CONFIGURAÇÃO REPLY DO DATABASE E SE TEM USER
  // SE CERTIFICA QUE A MENSAGEM TEM STATUS 'ATIVO'

  // PEGA O ID DO CARGO MENCIONADO NA REPLY, CRIA UMA DM COM ESSE ID, PESQUISA
  // A MENSAGEM DO SUPORTE PRA USAR COMO REPLY E ENTAO ENVIA A MENSAGEM
  try {
    const User = dadosSQL.user;
    await SecurityPrivate(Message, dadosSQL);

    const message = await (await (await Message.client.guilds.fetch(User.guild))
      .channels.fetch(User.replyGuildChannel))
      .messages.fetch(User.replyGuildMessage);
    await message.reply(Message.content); // reply

  } catch (e) {
    if (e?.name === 'continued') { ; /*console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO\n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
}

// PAREI AQUI