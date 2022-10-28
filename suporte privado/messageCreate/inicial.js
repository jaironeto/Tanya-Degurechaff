const { novo } = require('../private/functions/novo')
const { current } = require('../private/functions/current')

module.exports = async function inicial(message, dadosSQL) {
  try {
    if (dadosSQL?.user?.status === 'ativo') { return }

    if (dadosSQL?.user?.status === 'ocioso') { await current(message, dadosSQL) }
    else { await novo(message) }

    return true;
  }
  catch (e) {
    if (e?.name === 'continued') {
      ; /*console.error(`\n\n\n\nERROR DE DESENVOLVIMENTO\n${e?.stack}\n\n\n\n`)*/
      return false;
    }
    else throw e
  }
}