
module.exports = async function partnerTimeout(timeout) {

  global.codePartner = global.codePartner.filter((e, index) => {
    if (index > 10000) { return false }
    if ((e.timer.getFullYear() === message.createdAt.getFullYear())
      && (e.timer.getDate() === message.createdAt.getDate())
      && (e.timer.getDay() + 1 >= message.createdAt.getDay())) {
      return true;
    }
  });
}