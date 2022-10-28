const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const privateMysql = require('../../public/database/private');
const { Continued } = require('../../public/error/continued');


module.exports = async function config(interaction) {

  if (!interaction?.member?.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    interaction.editReply("Você precisa das permissões de kickMembers para usar esse comando")
    return;
  }

  await privateMysql.guild({ _guild: interaction.guildId, _channel: interaction.channelId })
  var configName = '';

  label: for (var opcao of interaction.options._hoistedOptions) {
    switch (opcao.name) {
      case 'connect':
        if (opcao.value === 'active') {
          await privateMysql.guild({ connect: true, _guild: interaction.guildId });
          configName += `\`${opcao.name}\` `
        }
        else {
          await privateMysql._deleteGuild({ _guild: interaction.guildId })
          configName += `\`${opcao.name}\` `
          break label;
        }

        break;
      case 'message':
        if (opcao.value.length > 1900) {
          await interaction.editReply('mensagem invalida')
          throw new Continued();
        }

        await privateMysql.guild({ message: opcao.value, _guild: interaction.guildId })
        configName += `\`${opcao.name}\` `
        break;
      case 'image':
        console.log(opcao.value)
        if (!(opcao.value.slice(0, 20 !== 'https://i.imgur.com/')
          || opcao.value.slice(0, 18) !== 'https://imgur.com/')) {
          await interaction.editReply('Image invalid, apenas imgur suportado! utilize o formato por extenso (https://): https://imgur.com/ ou https://i.imgur.com/');
          throw new Continued();
        }

        await privateMysql.guild({ image: opcao.value, _guild: interaction.guildId })
        configName += `\`${opcao.name}\` `
        break;
      case 'opcao1':
      case 'opcao2':
      case 'opcao3':
      case 'opcao4':
        if (opcao.value.length > 40) {
          await interaction.editReply('mensagem muito longa');
          throw new Continued();
        }

        // CONFIGURA A OPÇÃO E O CANAL A PARTIR DE ONDE O COMANDO FOI INVOCADO
        await privateMysql.guild({
          _guild: interaction.guildId,
          [opcao.name]: ((opcao.value === 'null') ? null : opcao.value),
          [`canal${opcao.name.at(-1)}`]: interaction.channelId,
        })

        configName += `\`${opcao.name}\` `
    }
  }

  console.log('\n\naquinao\n\n');
  await interaction.editReply(`Configurações Atualizadas com Sucesso: ${configName}`);
}