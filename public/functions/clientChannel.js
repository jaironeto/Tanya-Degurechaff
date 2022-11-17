const Continued = require("../error/continued");
const { Base, Message } = require('discord.js')
module.exports = async function clientGuild(discord, Channel) {
  try {
    if(discord instanceof Base === false) { throw new Continued('error sintax estatico') }
    if(Channel instanceof Message === false) { throw new Continued('error sintax estatico') }
    
    const guild = await discord.client.guilds.fetch(Channel?.guildId);
    return await guild?.channels?.fetch(Channel?.id)
  } catch (e) {
    throw new Continued();
  }
}