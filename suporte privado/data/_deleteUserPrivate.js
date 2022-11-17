const { Guild, User, Predizer } = require('../../public/database/_configPrivate');
const Continued = require('../../public/error/continued');

module.exports = async function _deleteUserPrivate(user) {

  global.userPrivateRAM = global.userPrivateRAM
    .filter(e => e?.get('user') !== user)
    
  const dados = await User.destroy({
    where: {
      user: user
    }
  })

  if (dados !== 0) { return dados }
  else { throw new Continued() }
}