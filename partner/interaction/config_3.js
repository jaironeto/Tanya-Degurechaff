const { partner, guildPartner, buscarGuild, _deleteGuild } = require('../../public/database/partner');
const message = require('../messageCreate/message');

module.exports = async function config_3(interaction) {

  const intervalo = interaction?.options?._hoistedOptions[0]?.value;
  if (intervalo > 30 || intervalo < 1) {
    await message.editReply('value invalid');
  }
  else {
    await interaction.editReply(`Quantidade de membro alterado para ${intervalo} dias`);
    await guildPartner({ _guildId: interaction.guildId, _channel: interaction.channelId, intervalo: intervalo })
  }
}