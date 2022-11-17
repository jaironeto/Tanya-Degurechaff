const { Guild } = require('../../public/database/_configPrivate');
const type = require('../../public/security/Security_verifyArguments')

module.exports = async function guildPrivate({ guild, channel, connect, message,
  image, mencao, opcao1, opcao2, opcao3, opcao4, opcao5, canal1,
  canal2, canal3, canal4, canal5 }, sql) {

  const model = sql || Guild.build()

  for (let e in arguments[0]) {
    if (arguments[0][e]) {
      model.set(e, arguments[0][e])
    }
  }

  if (sql) { await model.update() }
  await model.save() 
  global.userPrivateRAM.unshift(model);
  return model;
}

