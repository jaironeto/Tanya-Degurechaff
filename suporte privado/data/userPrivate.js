const { User } = require('../../public/database/_configPrivate');
const type = require('../../public/security/Security_verifyArguments');

module.exports = async function userPrivate({ user,
  username, guild, status, staff, opcoes, sendPrivateJSON,
  replyGuildJSON }, sql) {

  const model = sql || User.build();

  for (let e in arguments[0]) {
    if (arguments[0][e]) {
      model.set(e, arguments[0][e])
    }
  }
  
  if (sql) { await model.update() }
  await model.save();
  global.userPrivateRAM.unshift(model);
  return model;
}