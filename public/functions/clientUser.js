const Continued = require("../error/continued");
const { Base } = require('discord.js')

module.exports = async function clientGuild(discord, userId) {
  try {
    if(discord instanceof Base === false) { throw new Continued('error sintax estatico') }
    if(typeof userId !== 'string') { throw new Continued('error sintax estatico') }
    
    return await discord.client.users.fetch(userId);
  } catch (e) {
    throw new Continued();
  }
}