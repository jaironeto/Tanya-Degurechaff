const ReplyCadeia = require('../../public/class/ReplyCadeia');
const { iniciar } = require('../private/functions/#iniciar');
const { finalizar } = require('../private/functions/finalizar');
const { status } = require('../private/functions/status');
const DadosDiscord = require('../../public/class/DadosDiscord');
const { forceFinalizar } = require('../private/functions/force finalizar');
const { forceIniciar } = require('../private/functions/force iniciar');

module.exports = async function comando(message, dadoSQL) {
  // VERIFICA SE A MENSAGEM FOI ENVIADO DE UMA GUILD, SE E UM BOT
  if (message.guildId === null) { return }

  // CHAMA A FUNÇÃO QUE PEGA O ID DO CARGO MENCIONADO CADEIA DE REFERENCE DA REPLY
  // USA O reply.userId PEGO DA INSTRUÇÃO ANTERIOR E USA PARA VERIFICAR O USER
  const discord = new DadosDiscord(message);
  const reply = new ReplyCadeia(); await reply.fetch(message);
  const User = await dadoSQL.userFetch(reply.userId);

  // VERIFICAÇÃO SEM RESTRIÇÃO DE USER.STATUS OU GUILD
  switch (message.content.toLowerCase()) {
    case 'status':
      await status(message, User, reply.userId, discord);
      return;
  }

  // VERIFICAÇÃO SEM CASE SENSITIVE E COM RESTRIÇÃO DE GUILD
  if (User?.guild !== message.guildId) { return }
  switch (message.content) {
    case '**FINALIZAR**':
      await forceFinalizar(message, User, reply.userId, discord);
      return;
    case '**INICIAR**':
      await forceIniciar(message, User, reply.userId, discord);
      return;
  }
  // VERIFICA SE ELE POSSUI STATUS ATIVO E SE O SUPORTE DELE E PRA ESSA GUILD
  // HERDADO DO IF ACIMA
  if (User?.status !== 'ativo') { return }
  switch (message.content.toLowerCase()) {
    case 'iniciar':
      await iniciar(message, User, reply.userId, discord);
      return;
    case 'finalizar':
      await finalizar(message, User, reply.userId, discord);
      return;
  }
}