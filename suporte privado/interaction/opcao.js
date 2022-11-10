const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const privateMysql = require('../../public/database/private');
const { Continued } = require('../../public/error/continued');


module.exports = async function opcao(interaction, hoistedOptions) {

  if (hoistedOptions.value.length > 40) {
    await interaction.editReply('mensagem muito longa');
    return;
  }

  await interaction.editReply(`Suporte privado configurado com sucesso \`${hoistedOptions?.name}\``);
  await privateMysql.guild({
    _guild: interaction.guildId,
    [hoistedOptions.name]: ((hoistedOptions.value === 'null') ? null : hoistedOptions.value),
    [`canal${hoistedOptions.name.at(-1)}`]: interaction.channelId,
  })
}