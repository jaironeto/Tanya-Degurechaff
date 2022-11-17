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
    await interaction.editReply(`suporte em andamento com <@${userSQL?.get('staff')}>`);
  } else {
    await interaction.editReply('esse suporte ainda não foi iniciado em nenhuma thread')
  }
}