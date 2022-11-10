const { partner, guildPartner, buscarGuild } = require('../../public/database/partner');
const { PermissionsBitField } = require('discord.js')
module.exports = async function verifyPartner(message, codePartner) {

  const guildSQL = await buscarGuild(message.guildId);
  if (guildSQL?.channel !== message.channelId) { return }

  const index = message?.content?.lastIndexOf('https://discord.gg/')
  const _code = message?.content?.slice(index + 19)
  const code = _code.split(' ')[0];
  
  if (index === -1) { await message.delete(); return; }

  var verifyCodeGuild;
  var invite;

  for (let guildInvite of message.client.guilds.cache) {
    try {
      verify = await guildInvite[1]?.invites?.fetch(code);
      if (verify) { invite = verify; break; }
    } catch (e) { ; }
  }
  if (!invite?.guild?.id) {
    await message.delete();
    const msg = await message.channel
      .send(`<@${message.author.id}> O bot nao conseguiu achar a guilda de seu convite`);
    setTimeout(async () => await msg.delete(), 7000);
    return;
  }

  try {
    const member = await invite.guild.members.fetch(message.author.id);
    if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      await message.delete();
      const msg = await message.channel
        .send(`<@${message.author.id}> você precisa dar permissão de gerenciar mensagens na guilda que deseja fazer parceria`)
        setTimeout(async () => await msg.delete(), 7000);
      return;
    }

    else if (invite?.guild.members.cache.size < guildSQL.membros) {
      await message.delete();
      const msg = await message.channel
        .send(`<@${message.author.id}> sua guilda precisa ter no minimo ${guildSQL.membros} membros`)
        setTimeout(async () => await msg.delete(), 7000);
      return
    }
  } catch (e) { return }


  const teste = await partner({
    _guildId: invite.guild.id,
    _guildAlvo: message.guild.id
  });

  if (teste[0]?.dataValues?.messageId) {
    const dateSQL = new Date(teste[0].dataValues.updatedAt);

    if ((dateSQL.getFullYear() >= message.createdAt.getFullYear()) && (dateSQL.getMonth() >= message.createdAt.getMonth() && (dateSQL.getDate() + guildSQL.intervalo < message.createdAt.getDate()))) {
      await message.channel.send(`<@${message.author.id}> Parceria renovada com sucesso ${guildSQL?.role ? '<@&' + guildSQL?.role + '>' : ''}`)
      await partner({
        _guildId: invite.guild.id,
        _guildAlvo: message.guild.id,
        messageId: message.id
      });
    }
    else {
      await message.delete()
      const msg = await message.channel
        .send(`<@${message.author.id}> Tempo de renovação insuficiente, aguarde mais ${dateSQL.getDate() + guildSQL.intervalo - message.createdAt.getDate()} days`);
      setTimeout(async () => await msg.delete(), 10000);
    }
  }
  else {
    for (let e of codePartner) {
      if (invite?.guild?.id === e.guildId) {
        try {
          const code = await message.guild.invites.fetch(e.code);
          if (code) {
            verifyCodeGuild = true;
            break;
          }
        } catch (e) { '' }
      }
    }

    if (verifyCodeGuild === undefined) {
      await message.delete();
      const msg = await message.channel
        .send(`<@${message.author.id}> Primeiro envie um convite valido dessa guilda em até 10 minutos antes de tentar firmar a parceria.`);
      setTimeout(async () => await msg.delete(), 7000);
    }
    else {
      await message.channel.send(`<@${message.author.id}> Parceria firmada com sucesso ${guildSQL?.role ? '<@&' + guildSQL?.role + '>' : ''}`)
      await partner({
        _guildId: invite.guild.id,
        _guildAlvo: message.guild.id,
        messageId: message.id
      });
    }
  }
}