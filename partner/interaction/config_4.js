const { partner, guildPartner, buscarGuild, _deleteGuild } = require('../../public/database/partner');
const message = require('../messageCreate/message');

module.exports = async function config_4(interaction) {

  const membros = interaction?.options?._hoistedOptions[0]?.value;
  if (membros > 100000 || membros < 1) {
    await message.editReply('value invalid');
  }
  else {
    await interaction.editReply(`Quantidade de membro alterado para ${membros}`);
    await guildPartner({ _guildId: interaction.guildId, _channel: interaction.channelId, membros: membros })
  }
}