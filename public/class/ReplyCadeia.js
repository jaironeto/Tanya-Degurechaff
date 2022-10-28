const { Continued } = require('../error/continued.js')
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
    if (!(message instanceof Message)) { throw new Error('error sintaxy messageReply[1]') }

    var condition = true;
    var reference = await message?.fetchReference();
    if (reference === undefined) { throw new Error('error sintaxy messageReply[2]') }

    try {
      do {
        if (reference?.reference?.messageId) {
          reference = await reference?.fetchReference()
        }
        else { condition = false }
      } while (condition)
    } catch (e) {
      throw new Continued()
    }

    // NAO DEIXA ATRIBUIR OS DADOS SE A REFERENCE NAO FOR ESSE BOT
    // OU SE NAO TIVER MENÇÕES
    if (message.client.user.id !== reference?.author?.id) { return }
    if (reference?.mentions?.users?.at(0)?.id === undefined) { return }

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