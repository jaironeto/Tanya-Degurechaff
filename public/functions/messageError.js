const { Base } = require('discord.js')
// FAZ AS VERIFICAÇÕES NECESSARIAS E ENTAO,
// ENVIA UMA MENSAGEM PASSADA
// NAO IREI VERIFICAR CODE POR CAUSA QUE O CODE E DINAMICO
module.exports = async function errorAPI(discord, _code, message) {
  const code = Number(_code);

  if (arguments.length !== 3) { throw new Error('[1] error estatico utility/ErrorAPI') }
  if(discord instanceof Base === false) { throw new Error('error sintax estatico') }

  switch (code) {
    case 50007: 
      let msg50007 = message ?? 'error não foi possível enviar mensagens para o usuário';
      await discord.reply(msg50007 + ` [${code}]`)
      return
    case 10008:
      let mesg10008 = message ?? `error mensagem ou reply não existe`;
      await discord.reply(mesg10008 + ` [${code}]`)
      return
    default:
      let mesg0 = message ?? ' error desconhecido detectado!';
      await discord.reply(mesg0 + ` [??]`)
      return true;
    }
}