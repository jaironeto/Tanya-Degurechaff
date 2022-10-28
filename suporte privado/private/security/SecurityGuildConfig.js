const type = require('../../../public/security/Security_verifyArguments')

async function SecurityGuildConfigGLOBAL(interaction, guild) {
  type.argsSize(1, arguments.length);
  type.string(guild);
  type.APIGuildChannel(interaction);
  type.APIundefined(guild);
  type.APITrue(interaction.user.bot)
  type.APITrue(interaction?.options?._hoistedOptions?.length === 0);
}

module.exports = {
  SecurityGuildConfigGLOBAL
}