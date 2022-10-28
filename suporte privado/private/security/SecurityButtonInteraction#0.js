const { ButtonInteraction, DMChannel } = require('discord.js');
const type = require('../../../public/security/Security_verifyArguments')
const { Continued } = require('../../../public/error/continued')
// VERFICA SE A MENSAGEM VEM A PARTIR DE UM BOT
// VERIFICA TAMBEM SE AS OPÇÕES BASE
// VERIFICA SE INTERACTION E UMA INSTANCIA DE BUTTON
// VERIFICA SE O USUARIO QUE INVOCOU A FUNÇÃO EXISTE NO BANCO DE DADOS
// O USUARIO E IDENTIFICADO A PARTIR DO OBJETVO INTERACTION PASSADO;
// PARA MAIS INFORMAÇÕES VEJA O UTILITARIO VERIFY
class SecurityButtonInteraction {

  #interaction
  #user

  constructor(interaction, user) {
    this.#interaction = interaction;
    this.#user = user;
  }

  verify() {
    switch (this.#interaction.customId) {
      case 'proximo':
      case 'anterior':
      case 'iniciar':
      case 'fechar':
      case 'opcao1':
      case 'opcao2':
      case 'opcao3':
      case 'opcao4':
        break;
      default:
        throw new Continued(this?.verify?.name);
    }

    type.isUndefined(this.#user);
    type.notString(this.#user);
    type.isTrue(this.#interaction?.user?.bot);
    type.APIDMChannel(this.#interaction.channel);
    type.APIButtonInteraction(this.#interaction);
  }
}
module.exports = {
  SecurityButtonInteraction
}

