const { anterior } = require('../private/functions/anterior');
const { SecurityButtonInteraction } = require('../private/security/SecurityButtonInteraction#0');

module.exports = async function buttonAnterior(interaction, dadosSQL) {
  try {
    const userSQL = dadosSQL.user;
    const securityGlobal = new SecurityButtonInteraction(interaction, userSQL?.user);

    securityGlobal.verify();
    await anterior(interaction, dadosSQL);

  } catch (e) {
    if (e?.name === 'continued') { ;/* console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO/n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
} 