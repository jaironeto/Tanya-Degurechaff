const ReplyCadeia = require('../../public/class/ReplyCadeia');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');

module.exports = async function comandoFinalizar(interaction) {
  const reply = new ReplyCadeia();
  await reply.fetch(interaction.targetMessage);
  const userSQL = await buscarUserPrivate(interaction.user.id);

  if (!userSQL) {
    await interaction.editReply('Usuario não encontrado')
    return
  }

  if (userSQL?.get('staff')) {
    await interaction.editReply(`suporte encerrado com sucesso`);
    await _deleteUserPrivate(interaction.user.id);
    await userSQL?.get('sendPrivateJSON')?.edit({ components: [], embeds: [global.embedPrivateFinalizar]})
    await userSQL.get('sendPrivateJSON')?.channel.send(`**${interaction.user.username + '#' + interaction.user.discriminator} encerrou o suporte!**`)
  } else {
    await interaction.editReply('esse suporte ainda não foi iniciado em nenhuma thread')
  }

}