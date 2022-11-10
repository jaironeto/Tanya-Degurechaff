const privateMysql = require('../../public/database/private');

module.exports = async function connect(interaction, hoistedOptions) {

  await privateMysql.guild({ _guild: interaction.guildId, _channel: interaction.channelId })

  if (hoistedOptions.value === 'active') {
    await interaction.editReply(`Suporte privado configurado com sucesso \`${hoistedOptions?.name}\``);
    await privateMysql.guild({ connect: true, _guild: interaction.guildId });
    await privateMysql.predizerInteraction(interaction);
  }
  else {
    await interaction.editReply(`Suporte privado configurado com sucesso \`${hoistedOptions?.name}\``);
    await privateMysql._deleteGuild({ _guild: interaction.guildId })
  }
}