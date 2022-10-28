const { anterior } = require('../private/functions/anterior');
const { fechar } = require('../private/functions/fechar');
const { iniciar } = require('../private/functions/iniciar');
const { proximo } = require('../private/functions/proximo');
const { opcoes } = require('../private/functions/opcoes');
const { SecurityButtonInteraction } = require('../private/security/SecurityButtonInteraction#0');
const { SecurityButtonInteraction_1 } = require('../private/security/SecurityButtonInteraction#1');

module.exports = async function opcaoComponentDM(interaction, dadosSQL) {
  try {
    const userSQL = dadosSQL.user;
    const guildFetch = await dadosSQL.guildFetch(userSQL?.guild);
    const securityGlobal = new SecurityButtonInteraction(interaction, userSQL?.user);
    const securitySpecify = new SecurityButtonInteraction_1(interaction, userSQL?.user, guildFetch?.guild);

    switch (interaction.customId) {
    case 'fechar':
      await fechar(interaction);
      return;
    }
    
    securityGlobal.verify();
    switch (interaction.customId) {
      case 'proximo':
        await proximo(interaction, dadosSQL);
        return;
      case 'anterior':
        await anterior(interaction, dadosSQL);
        return;
    }

    await securitySpecify.verifyAsync();
    switch (interaction.customId) {
      case 'iniciar':
        await iniciar(interaction, dadosSQL);
        return;
      case 'opcao1':
      case 'opcao2':
      case 'opcao3':
      case 'opcao4':
        await opcoes(interaction, dadosSQL, interaction.customId); // interaction.customId
    }
  } catch (e) {
    if (e?.name === 'continued') { ;/* console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO/n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
} 