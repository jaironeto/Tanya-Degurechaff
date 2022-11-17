const { Message, BaseInteraction } = require('discord.js');
const Continued = require('../error/continued');

module.exports = class DadosDiscord {

  #userId;
  #channelId;
  #guildId;
  #discord;
  #username;

  constructor(discord) {
    if (!(discord instanceof Message || discord instanceof BaseInteraction)) { throw new Continued('[1] Continued argumentos utility/send') }

    this.#userId = discord?.author?.id ?? discord?.user?.id;
    this.#channelId = discord?.channelId;
    this.#guildId = discord?.guildId;
    this.#discord = discord;

    const username = discord?.author?.username ?? discord?.user?.username
    const discriminator = discord?.author?.discriminator ?? discord?.user?.discriminator
    if (username === undefined || discriminator === undefined) { throw new Continued('Continued sintaxy constructor [1]') }

    this.#username = username.toString() + '#' + discriminator.toString();

    if (this.#userId === undefined) { throw new Continued('Continued sintaxy constructor [2]') }
    if (this.#channelId === undefined) { throw new Continued('Continued sintaxy constructor [3]') }
    if (this.#guildId === undefined) { throw new Continued('Continued sintaxy constructor [4]') }
    if (this.#discord === undefined) { throw new Continued('Continued sintaxy constructor [5]') }
  }

  // FUNÇÕES DE BUSCA RESUMIDA DOS DADOS APARTIR DO OBJETO CORRENTE
  // COMO E ALGO IMPORTANTE, DEVE RETORNAR O DADO OU UM Continued
  get userId() { return this.#userId }
  get channelId() { return this.#channelId }
  get guildId() { return this.#guildId }
  get username() { return this.#username }

  // BUSCA MAIS GERAL DOS DADOS, ENQUANTO USA UMA FUNÇÃO PRIVADA NOS BASTIDORES
  // PARA ABSTRAIR AS OPÇÕES EM APENAS UM LUGAR PARA EVITAR ContinuedS ACIDENTAIS
  // COMO E ALGO IMPORTANTE, DEVE RETORNAR O DADO OU UM Continued
  async clientUserId(user) {
    return (await this.#pVerifyClient('users', user)).id
  }
  async clientGuildId(guild) {
    return (await this.#pVerifyClient('guilds', guild)).id
  }
  async clientChannelId(channel) {
    return (await this.#pVerifyClient('channels', channel)).id
  }

  async clientUsername(user) {
    const dados = await this.#pVerifyClient('users', user);
    return dados?.username?.toString() + '#' + dados?.discriminator?.toString();
  }
  async clientGuildUsername(user) {
    const dados = await this.#pVerifyClient('guilds', user);
    return dados?.name?.toString();
  }


  async #pVerifyClient(opcao, id) {
    if (typeof id !== 'string') { throw new Continued('Continued sitnax dadosAPI [6]') }
    if (!(opcao !== 'channels' || opcao !== 'guilds' || opcao !== 'users')) { throw new Continued('Continued sitnax dadosAPI [7]') }

    var dados = undefined;
    try {
      dados = await this.#discord.client[opcao]?.fetch(id);
    } catch (e) { throw new Continued('Continued sitnax dadosAPI [8]') }

    return dados;
  }
}