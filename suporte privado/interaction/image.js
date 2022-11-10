const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const privateMysql = require('../../public/database/private');
const { Continued } = require('../../public/error/continued');


module.exports = async function image(interaction, hoistedOptions) {

  if (!(hoistedOptions?.value.slice(0, 20 !== 'https://i.imgur.com/')
    || hoistedOptions?.value.slice(0, 18) !== 'https://imgur.com/')) {
    await interaction.editReply('Image invalid, apenas imgur suportado! utilize o formato por extenso (https://): https://imgur.com/ ou https://i.imgur.com/');
    return;
  }

  await interaction.editReply(`Suporte privado configurado com sucesso \`${hoistedOptions?.name}\``);
  await privateMysql.guild({ image: hoistedOptions.value, _guild: interaction.guildId })
}