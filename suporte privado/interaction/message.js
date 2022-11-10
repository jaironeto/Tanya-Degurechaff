const privateMysql = require('../../public/database/private');

module.exports = async function message(interaction, hoistedOptions) {

  if (hoistedOptions.value.length > 1900) {
    await interaction.editReply('mensagem invalid')
    return;
  }

  await interaction.editReply(`Suporte privado configurado com sucesso \`${hoistedOptions?.name}\``);
  await privateMysql.guild({ message: hoistedOptions.value, _guild: interaction.guildId })
}