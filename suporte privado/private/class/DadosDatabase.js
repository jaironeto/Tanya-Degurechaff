const { Message, BaseInteraction } = require('discord.js');
const privateMysql = require('../../../public/database/private');

// UTILITARIO GLOBAL
// TESTA SE OS DADOS EXISTE NO DATABASE E RETORNA TRUE/UNDEFINED
// OS ERROS SAO APENAS DE SINTAX, DADO QUE A NATUREZA DO UTILITARIO E SER DINAMICO
// POR FIM, TESTA A AUSENCIA DOS DADOS 
// E CASO PASSADO VALUE, TESTE SE OPCOES POSSUI O VALOR PASSADO (NO CASO, O DATABASE)

module.exports = class VerifyDatabase {

  #user
  #guild

  constructor(objectDiscord) {
    if (!(objectDiscord instanceof BaseInteraction || objectDiscord instanceof Message)) { throw new Error('error sintax verify/user [1]') }

    this.#user = objectDiscord?.author?.id ?? objectDiscord?.user?.id;
    this.#guild = objectDiscord?.guildId
  }

  // PESQUISA OS DADOS COMO QUE FORAM DISPONIBILIZADOS IMPLICITAMENTE
  // PELO OBJETO QUE TENHA INSTANCIADO A CLASS
  async user(opcoes, value) {
    const User = await privateMysql.buscarUser(this.#user)

    if (User === undefined) { return }
    if (arguments.length === 0) { return User }

    return this.#verifyDados(User, opcoes, value)
  }

  async guild(opcoes, value) {
    const Guild = await privateMysql.buscarGuild(this.#guild)

    if (Guild === undefined) { return }
    if (arguments.length === 0) { return Guild }

    return this.#verifyDados(Guild, opcoes, value)
  }

  // DIFERENÇA DAS FUNÇÕES ACIMA, ESSAS DEVE TER O ALVO PASSADO EXPLICITAMENTE
  // E DIFERENTE DAS FUNÇÕES ACIMA, RETORNA UM ERRO CASO NENHUM ARGUMENTO SEJA PASSADO
  async guildFetch(guild, opcoes, value) {
    const Guild = await privateMysql.buscarGuild(guild);

    if (Guild === undefined) { return }
    if (arguments.length === 1) { return Guild }

    return this.#verifyDados(Guild, opcoes, value)
  }

  async userFetch(user, opcoes, value) {
    const User = await privateMysql.buscarUser(user);

    if (User === undefined) { return }
    if (arguments.length === 1) { return User }

    return this.#verifyDados(User, opcoes, value)
  }

  // VERIFICAÇÕES INTERNA PARA NAO REPETIR CODIGO
  #verifyDados(dados, opcoes, value) {
    if (opcoes !== undefined && !Array?.isArray(opcoes)) { throw new Error('error sintax verify/user [5]') }
    if (value !== undefined && !Array?.isArray(value)) { throw new Error('error sintax verify/user [6]') }
    const valorNotExiste = true;

    for (let opcoesI of opcoes) {
      if (dados[opcoesI] === null) { return }

      if (arguments.length === 3) {
        for (let valueI of value) {
          if (dados[opcoesI] === valueI) { valorNotExiste = false; break; }
        }
        if (valorNotExiste) { return }
      }
    }

    return dados;
  }
}