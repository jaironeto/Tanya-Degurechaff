const Continued = require('../error/continued.js')
const { Message } = require('discord.js')

module.exports = class ReplyCadeia {
  #userId
  #channelId
  #guildId
  #messageId
  #MessageSuportObject

  async fetch(message) {
    // VERIFICA SE A MENSAGEM TEM UMA REFERENCIA A OUTRA MENSAGEM
    // SE TIVER, ELE IRA IR ATE A MENSAGEM REFERENCE E FAZER A VERIFICAÇÃO NOVAMENTE
    // ATÉ CHEGAR AO FIM DA CADEIA DE REFERENCE QUE NASCE SEMPRE DO BOT
    // NO FIM VERIFICA SE ERA UMA REPLY PASSADA, SE NAO DAR ERRO
    // SE TUDO DER CERTO RETORNA A MENSAGEM RAIZ DA CADEIA DE REPLY
    // PARA FAZER VERIFICAÇÕES EXTERNAS;
    if (!(message instanceof Message)) { throw new Continued('error sintaxy messageReply[1]') }
    try {
      var reference;
      var condition = true;

      if ((message?.mentions?.users?.at(0)?.id !== undefined)
        && (message?.reference === null)) {
        var reference = message;
        condition = false;
      } else { reference = await message?.fetchReference() }


      while (condition) {
        if (reference?.reference?.messageId) {
          reference = await reference?.fetchReference()
        }
        else { condition = false }
      }
    } catch (e) {
      throw new Continued()
    }

    if (message.client.user.id !== reference?.author?.id) { throw new Continued() }
    if (reference?.mentions?.users?.at(0)?.id === undefined) { throw new Continued() }

    this.#MessageSuportObject = reference;
    this.#userId = reference?.mentions?.users?.at(0)?.id;
    this.#messageId = reference?.id;
    this.#channelId = reference?.channelId;
    this.#guildId = reference?.guildId;
  }

  get userId() {
    return this.#userId;
  }
  get messageId() {
    return this.#messageId;
  }
  get channelId() {
    return this.#channelId;
  }
  get channelId() {
    return this.#guildId;
  }
  get MessageSuportObject() {
    return this.#MessageSuportObject
  }
}