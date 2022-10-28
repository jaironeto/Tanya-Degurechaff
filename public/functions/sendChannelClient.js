const { Message, BaseInteraction } = require('discord.js')
const { Continued } = require('../error/continued');

module.exports = async function sendChannelClient(discord, channelId, texto) {
  // VERIFICA SE O TEXTO PASSADO E UMA STRING, SE O OBJETO PASSADO PARA O PARAMETRO DISCORD
  // E UMA MENSAGEM OU INTERACTION (QUE TEM EM COMUM CHANNELID)
  // MAS NAO CHANNEL, ENTAO TEM QUE VERIFICAR NO ELSE PARA VERSAO DE 2 PARAMETROS
  // SE TODOS OS ARGUMENTS FORAM PASSADOS
  // SE O TERCEIRO ARGUMENTO E UM OBJETO E SE OS PARAMETROS PASSADO SAO STRING
  // SE OS DADOS NAO BATER LANÇA UM ERRO
  // SE TUDO DER CERTO, ENVIA A MENSAGEM NO CANAL ESPECIFICADO OU FAZ UMA PESQUISA GERAL
  // ATE O CANAL ESPECIFICADO
  if (!(discord instanceof Message || discord instanceof BaseInteraction)) { throw new Error('[1] error argumentos utility/send') }
  if (typeof texto !== 'string') { throw new Error('[2] error argumentos utility/send') }
  if (typeof channelId !== 'string') { throw new Error('[3] error argumentos utility/send') }
  if (arguments.length !== 3) { throw new Error('[4] error argumentos utility/send') }

  let canal;
  try {
    canal = await discord?.client?.channels?.fetch(channelId);
    return await canal.send(texto);
  } catch (e) {
    discord.reply(`Nao foi possivel enviar a mensagem para o canal "${canal?.name ?? 'desconhecido'}"`);
    throw new Continued();
  }
}