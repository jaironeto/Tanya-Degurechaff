const ReplyCadeia = require('../../public/class/ReplyCadeia');
const DadosDiscord = require('../../public/class/DadosDiscord');
const Continued = require('../../public/error/continued');
const sendDMClient = require('../../public/functions/sendDMClient');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const userPrivate = require('../data/userPrivate');
// VERIFICA SE A MENSAGEM FOI ENVIADO DE UMA GUILD, SE E UM BOT
// CHAMA A FUNÇÃO QUE PEGA O ID DO CARGO MENCIONADO CADEIA DE REFERENCE DA REPLY
// USA O reply.userId PEGO DA INSTRUÇÃO ANTERIOR E USA PARA VERIFICAR O USER
// VERIFICAÇÃO SEM RESTRIÇÃO DE USER.STATUS OU GUILD
module.exports = async function comandoIniciar(interaction) {

  const message = interaction.targetMessage;
  const discord = new DadosDiscord(interaction);
  const reply = new ReplyCadeia();
  await reply.fetch(interaction.targetMessage);
  const userSQL = await buscarUserPrivate(reply?.userId);
  if (!userSQL) {
    await interaction.editReply(`Usuario não encontrado`);
    return
  }

  if (interaction.channel.type === 11 || interaction.channel.type === 12) {
    interaction.editReply('você não pode iniciar um suporte a partir de uma thread');
    return
  }

  console.log('\nstaff: ')
  console.log(userSQL.get('staff'))
  if (!userSQL.get('staff')) {
    await interaction.editReply(`suporte iniciado com sucesso`);
    await sendDMClient(message, reply?.userId, `**${discord.username} iniciou o suporte!**`)

    const thread = interaction.channel.threads.cache.find(e => e.name === userSQL.get('username'))
      ?? await message?.startThread({ name: await discord?.clientUsername(userSQL.get('user')) });
    const threadMessage = await thread.send(`Responda essa mensagem (reply) para enviar mensagens <@${await discord.clientUserId(userSQL.get('user'))}>`)

    await userPrivate({
      replyGuildJSON: threadMessage,
      staff: interaction.user.id, status: 'ativo'
    }, userSQL);
  }
  else {
    await interaction.editReply(`Suporte já em andamento com <@${userSQL?.get('staff')}>`)
  }
}