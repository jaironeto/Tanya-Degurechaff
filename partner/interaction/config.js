const { partner, guildPartner, buscarGuild, _deleteGuild } = require('../../public/database/partner');

module.exports = async function config(interaction) {

  if (interaction?.options?._hoistedOptions[0]?.value === 'ativarPartner') {
    await interaction.editReply('Partners ativado nesse canal')
    await guildPartner({ _guildId: interaction.guildId, _channel: interaction.channelId })
  }
  else if (interaction?.options?._hoistedOptions[0]?.value === "desativarPartner") {
    try {
      await interaction.editReply('Partners desativado')
      await _deleteGuild(interaction.guildId);
    } catch (e) {
      if (e?.name === 'continued') { ; /*console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO\n${e?.stack}\n\n\n\n`)*/ }
      else throw e
    }
  }
}