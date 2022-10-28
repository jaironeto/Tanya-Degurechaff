const { Continued } = require("../error/continued");

module.exports = async function fetchClientGuild(discord, guild) {

  try {
    return await discord.client.guilds.fetch(guild);
  } catch (e) {
    throw new Continued();
  }
}
