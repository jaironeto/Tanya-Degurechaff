const { fechar } = require('../private/functions/fechar');

module.exports = async function buttonFechar(interaction) {
  try {

    await fechar(interaction);

  } catch (e) {
    if (e?.name === 'continued') { ;/* console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO/n${e?.stack}\n\n\n\n`)*/ }
    else throw e
  }
} 