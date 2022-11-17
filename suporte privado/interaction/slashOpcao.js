const { EmbedBuilder, PermissionsBitField } = require('discord.js');
//const { buscarGuild } = require('../../public/database/partner');
const Continued = require('../../public/error/continued');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');
const guildPrivate = require('../data/guildPrivate');

module.exports = async function slashOpcao(interaction, hoistedOptions) {

  const opcao = hoistedOptions.value.slice(0, 6);
  const value = hoistedOptions.value.slice(6).trimStart();

  await interaction.editReply(`Configuração atualizada com sucesso \`${opcao}: ${value}\``);
  if (value.length > 40) { throw new Continued() }

  const guildSQL = await buscarGuildPrivate(interaction.guildId);
  if (!guildSQL) {
    await interaction.editReply(`eu nem sei quem você é`);
    return
  }

  if (opcao === 'opcao1' || opcao === 'opcao2' || opcao === 'opcao3' || opcao === 'opcao4' || opcao === 'opcao5') {
    await guildPrivate({ guild: interaction.guildId, [opcao]: value, [`canal${opcao.at(-1)}`]: interaction.channelId }, guildSQL)
  } else {
    await interaction.editReply(`Escolha uma opção valida \`opcao: ${hoistedOptions.value}\``);
  }
}