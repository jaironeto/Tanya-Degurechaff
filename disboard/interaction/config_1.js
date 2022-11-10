const { disboard } = require("../database/disboard");

module.exports = async function config_1(interaction) {
  const role = interaction?.options?._hoistedOptions[0]?.value;
  await interaction.editReply(`<@${interaction.user.id}> você ativou/atualizou o disboard nesse canal com o cargo <@&${role}>`)
  await disboard({ _guildId: interaction.guildId, _channel: interaction.channel, role: role })
}