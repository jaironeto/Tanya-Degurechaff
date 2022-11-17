const { User } = require('../../public/database/_configPrivate');
const type = require('../../public/security/Security_verifyArguments')

module.exports = async function buscarUserPrivate(user) {

  var sql
  var ram =  global.userPrivateRAM.find(e => e?.get('user') === user)

  
  if (!ram) {
    sql = await User.findByPk(user)
    if (sql) {
      global.userPrivateRAM.unshift(sql)
    }
  }

  return ram || sql
}