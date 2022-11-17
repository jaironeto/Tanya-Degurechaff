const { Guild } = require('../../public/database/_configPrivate');
const type = require('../../public/security/Security_verifyArguments')

module.exports = async function buscarGuildPrivate(guild) {

  type.isUndefined(guild);
  type.isFalse(arguments.length === 1);

  var sql 
  var ram = global.guildPrivateRAM
    .find(e => e?.get('guild') === guild);

  if (!ram) {
    sql = await Guild.findByPk(guild)
    if (sql) {
      global.guildPrivateRAM.unshift(sql)
    }
  }

  return ram || sql;
}
