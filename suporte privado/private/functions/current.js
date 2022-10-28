const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { novo } = require('./novo')
const privateMysql = require('../../../public/database/private')

// ENCERRA SE NAO TIVER STATUS ALGUM
// ATUALIZA OS DADOS SE TIVER
// CHAMA A FUNÇÃO NOVO SE AINDA ESTIVER OCIOSO A X TEMPO
async function current(message, dadosSQL) {
  const userSQL = dadosSQL.user;

  switch (userSQL.status) {
    case 'ocioso':
      const timer = new Date().getTime() - userSQL.updatedAt.getTime()
      if (timer > 600000) {
        await privateMysql._deleteUser(message.author.id)
        await novo(message)
      }
      else {
        message.channel.send({ content: `Aguarde ${((700000 - timer) / 1000 / 60).toFixed()} minutos antes de uma nova mensagem surgir.`, ephemeral: true })
      }
  }
}

module.exports = {
  current
}