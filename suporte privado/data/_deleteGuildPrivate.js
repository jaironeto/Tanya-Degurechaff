const { Guild, User, Predizer } = require('../../public/database/_configPrivate');
const Continued = require('../../public/error/continued');

module.exports = async function _deleteGuildPrivate(guild) {

  global.guildPrivateRAM = global.guildPrivateRAM
    .filter(e => e?.get('guild') !== guild)

  const dados = await Guild.destroy({
    where: {
      guild: guild
    }
  })

  if (dados !== 0) { return true }
  else { throw new Continued() }
}