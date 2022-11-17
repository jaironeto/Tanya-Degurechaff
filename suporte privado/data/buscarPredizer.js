const { Predizer } = require('../../public/database/_configPrivate');

module.exports = async function buscarPredizer(user) {

  var model = global.predizerRAM.
  find(e => e?.get('user') === user)
  if (model) { return model }
  else {
    const dados = await Predizer.findAll({
      where: {
        user: user
      }
    });
    if (model?.length === 0 || model === false) { return }
    else {
      global.predizerRAM.unshift(model)
      return dados
    }
  }
}