const { partner, guildPartner, buscarGuild, _deleteGuild } = require('../../public/database/partner');

module.exports = async function config_2(interaction) {

    const role = interaction?.options?._hoistedOptions[0]?.value;
    await interaction.editReply(`O partners foi ativo no canal <#${interaction.channelId}> e o cargo <@&${role}> adicionado`)
    await guildPartner({ _guildId: interaction.guildId, _channel: interaction.channelId, role: role }) 
}