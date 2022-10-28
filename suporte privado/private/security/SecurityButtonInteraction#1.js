const { Continued } = require('../../../public/error/continued');
const type = require('../../../public/security/Security_verifyArguments')
const { SecurityButtonInteraction } = require('./SecurityButtonInteraction#0')
const privateMysql = require('../../../public/database/private')

class SecurityButtonInteraction_1 extends SecurityButtonInteraction {

  #guildFetchSQL;

  constructor(interaction, user, guildFetchSQL) {
    super(interaction, user);
    this.#guildFetchSQL = guildFetchSQL;
  }

  async verifyAsync() {
      type.isUndefined(await privateMysql.buscarGuild(this.#guildFetchSQL));
  }
}

module.exports = {
  SecurityButtonInteraction_1
}