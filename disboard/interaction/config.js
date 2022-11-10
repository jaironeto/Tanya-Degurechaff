const { disboard, _disboard } = require("../database/disboard");

module.exports = async function config(interaction) {
  await interaction.editReply(`O disboard foi desativado`)
  await _disboard(interaction.guildId);
}
