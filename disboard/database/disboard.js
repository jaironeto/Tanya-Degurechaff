const { Continued } = require('../../public/error/continued');
const { Model } = require('sequelize');
const { Disboard } = require('./_configDisboard');

// FUNÇÃO GUILD
async function disboard({ _guildId, _channel, role, verifyBusca }, verifyUpdate) {
  if (!(verifyUpdate === undefined || verifyUpdate instanceof Model)) { throw new Error('sintax error') }

  var check;
  if (verifyUpdate) { check = verifyUpdate }
  else { check = await Disboard.findByPk(_guildId) }

  if (check !== null) {
    if (_channel !== undefined) { check.update({ channel: _channel }) }
    if (role !== undefined) { check.update({ role: role }) }
  }
  else {
    if (verifyBusca) { return }
    else {
      const nowUpdate = await Disboard.create({ guildId: _guildId, channel: _channel });
      await disboard({ _guildId: _guildId, _channel: _channel }, nowUpdate);
    }
  }
  return check
}

async function _disboard(_guildId) {
  const dados = await Disboard.destroy({
    where: { guildId: _guildId }
  });

  if (dados) { return true }
  else { throw new Continued() }
}

module.exports = {
  disboard,
  _disboard
}




