const { Message, BaseInteraction } = require('discord.js')
const { Continued } = require('../error/continued')

module.exports = async function sendDMClient(discord, user, texto) {
  // VERIFICA SE O TEXTO PASSADO E UMA STRING, SE O OBJETO PASSADO PARA O PARAMETRO DISCORD
  // E UMA MENSAGEM OU INTERACTION (QUE TEM EM COMUM CHANNELID), SE USER E UMA STRING
  // SE TODOS OS ARGUMENTS FORAM PASSADOS
  // SE OS DADOS NAO BATER LANÇA UM ERRO
  if (!(discord instanceof BaseInteraction || discord instanceof Message)) { throw new Error('[1] error parametros utility/sendDM') }
  if (typeof texto !== 'string' || typeof user !== 'string') { throw new Error('[2] error parametros utility/sendDM') }
  if (arguments.length !== 3) { throw new Error('[3]error parametros utility/sendDM') }

  let _user;
  try {
    _user = discord.client.users.fetch(user);
    return await (await discord.client.users.createDM(user))
      .send(texto);
  } catch (e) {
  discord.reply(`nao foi possivel enviar a mensagem para o usuario "${_user?.name ?? 'desconhedio'}"`);
    throw new Continued();
  }
}