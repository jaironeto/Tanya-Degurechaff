const Continued = require("../error/continued");
const { Base } = require('discord.js')

module.exports = async function clientGuild(discord, guildId) {
  try {
    if(discord instanceof Base === false) { throw new Error('error sintax estatico') }
    if(typeof guildId !== 'string') { throw new Error('error sintax estatico') }
    
    return await discord.client.guilds.fetch(guildId);
  } catch (e) {
    throw new Continued();
  }
}