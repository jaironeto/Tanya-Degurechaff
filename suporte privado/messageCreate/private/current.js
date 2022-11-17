const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const _deleteUserPrivate = require('../../data/_deleteUserPrivate');
const novo = require('./novo')

// ENCERRA SE NAO TIVER STATUS ALGUM
// ATUALIZA OS DADOS SE TIVER
// CHAMA A FUNÇÃO NOVO SE AINDA ESTIVER OCIOSO A X TEMPO
module.exports = async function current(message, userSQL) {
  switch (userSQL.get('status')) {
    case 'ocioso':
      const timer = new Date().getTime() - userSQL.get('updatedAt').getTime()
      if (timer > 120000) {
        await _deleteUserPrivate(message.author.id)
        await novo(message)
      }
      else {
        const msgTimer = ((120000 - timer) / 1000 / 60).toFixed() === '0'
          ? (((120000 - timer) / 1000)).toFixed() + ' segundos'
          : ((120000 - timer) / 1000 / 60).toFixed() + ' minuto(s)';

        message.channel.send({ content: `Aguarde ${msgTimer} antes de uma nova mensagem surgir.`, ephemeral: true })
      }
  } 
}