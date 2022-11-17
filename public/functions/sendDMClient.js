const { Continued } = require('../error/continued')
const { Base } = require('discord.js')

module.exports = async function sendDMClient(discord, user, texto) {
  // VERIFICA SE O TEXTO PASSADO E UMA STRING, SE O OBJETO PASSADO PARA O PARAMETRO DISCORD
  // E UMA MENSAGEM OU INTERACTION (QUE TEM EM COMUM CHANNELID), SE USER E UMA STRING
  // SE TODOS OS ARGUMENTS FORAM PASSADOS
  // SE OS DADOS NAO BATER LANÇA UM ERRO
  if (discord instanceof Base === false) { throw new Continued('error sintax estatico') }
  if (typeof texto !== 'string' || typeof user !== 'string') { throw new Continued('[2] error parametros utility/sendDM') }
  if (arguments.length !== 3) { throw new Continued('[3]error parametros utility/sendDM') }

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