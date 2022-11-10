const { iniciar } = require('../private/functions/iniciar');
const { SecurityButtonInteraction } = require('../private/security/SecurityButtonInteraction#0');
const { SecurityButtonInteraction_1 } = require('../private/security/SecurityButtonInteraction#1');

module.exports = async function buttonIniciar(interaction, dadosSQL) {
  try {
    const userSQL = dadosSQL.user;
    const guildFetch = await dadosSQL.guildFetch(userSQL?.guild);
    const securityGlobal = new SecurityButtonInteraction(interaction, userSQL?.user);
    const securitySpecify = new SecurityButtonInteraction_1(interaction, userSQL?.user, guildFetch?.guild);

    securityGlobal.verify();
    await securitySpecify.verifyAsync();
        await iniciar(interaction, dadosSQL);
    
  } catch (e) {
    if (e?.name === 'continued') { ;/* console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO/n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
} 