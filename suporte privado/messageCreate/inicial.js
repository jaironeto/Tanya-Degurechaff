const novo = require('./private/novo')
const current = require('./private/current')
const Continued = require('../../public/error/continued');
const buscarUserPrivate = require('../data/buscarUserPrivate');

module.exports = async function inicial(message, userSQL) {

  if (userSQL?.get('status') === 'ocioso') {
    await current(message, userSQL)
  } else if (!userSQL) {
    await novo(message)
  }
}