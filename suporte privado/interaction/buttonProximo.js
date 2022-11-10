const { proximo } = require('../private/functions/proximo');
const { SecurityButtonInteraction } = require('../private/security/SecurityButtonInteraction#0');

module.exports = async function buttonProximo(interaction, dadosSQL) {
  try {
    const userSQL = dadosSQL.user;
    const securityGlobal = new SecurityButtonInteraction(interaction, userSQL?.user);

    securityGlobal.verify();
    await proximo(interaction, dadosSQL);

  } catch (e) {
    if (e?.name === 'continued') { ;/* console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO/n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
} 