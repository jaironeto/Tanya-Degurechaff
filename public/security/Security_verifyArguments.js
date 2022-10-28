const { Message, ButtonInteraction, BaseInteraction, GuildChannel, DMChannel } = require('discord.js');
const { Continued } = require('../error/continued')

function notString(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  for (let index of opcoes) {
    if (typeof index !== 'string') { throw new Continued() }
  }
}

function isUndefined(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  for (let index of opcoes) {
    if (typeof index === undefined) { throw new Continued() }
  }
}

function isTrue(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  for (let index of opcoes) {
    if (index === true) { throw new Continued() }
  }
}

function isFalse(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  for (let index of opcoes) {
    if (index === false) { throw new Continued() }
  }
}

function isBot(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  for (let index of opcoes) {
    const user = index?.user ?? index?.author;
    if (user === undefined) { throw new Error('error sintax isBot') }
    if (user.bot) { throw new Continued() }
  }
}

function argsSize(size, ...opcoes) {
  _verifyArgumentsIntern(opcoes)
  if (opcoes?.length !== size) { throw new Continued() }
}


function APIMessage(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  _verifyInstaceofIntern(Message, opcoes)
}

function APIButtonInteraction(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  _verifyInstaceofIntern(ButtonInteraction, opcoes)
}

function APIDMChannel(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  _verifyInstaceofIntern(DMChannel, opcoes)
}

function APIBaseInteraction(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  _verifyInstaceofIntern(BaseInteraction, opcoes)
}

function APIGuildChannel(...opcoes) {
  _verifyArgumentsIntern(opcoes)
  _verifyInstaceofIntern(GuildChannel, opcoes)
}

function _verifyInstaceofIntern(type, opcoes) {
  for (let index of opcoes) {
    if (index instanceof type === false) { throw new Continued() }
  }
}

function _verifyArgumentsIntern(opcoes) {
  if (opcoes.length === 0) { throw new Continued() }
}

module.exports = {
  APIButtonInteraction,
  APIGuildChannel,
  APIBaseInteraction,
  APIMessage,
  notString,
  argsSize,
  isUndefined,
  isTrue,
  APIDMChannel,
  isBot,
  isFalse
}