
module.exports = function enviado(message, codePartner) {

  const index = message?.content?.lastIndexOf('https://discord.gg/')
  const _code = message?.content?.slice(index + 19)
  const code = _code.split(' ')[0];

  if (index === -1) { return }

  codePartner.push({ guildId: message.guildId, timer: message.createdAt, code: code })

  codePartner = codePartner.filter(e => {
    if ((e.timer.getFullYear() === message.createdAt.getFullYear())
      && (e.timer.getDate() === message.createdAt.getDate())
      && (e.timer.getDay() === message.createdAt.getDay())
      && (e.timer.getHours() === message.createdAt.getHours())
      && (e.timer.getMinutes() + 10 >= message.createdAt.getMinutes())) {
      return true;
    }
  });
}