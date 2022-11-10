const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
// novos adicionados
const { EmbedBuilder, WebhookClient } = require('discord.js');

module.exports = async function teste(GuildMember) {

  if (GuildMember.guild.id !== '1038115856485462057') { return }
  // Obtem o id do canal, isso sera usado para ter acesso a classe channelText
  const channel = await GuildMember.client.channels
    .fetch('1038115856485462057')

  // cria a mensagemenbed 
  const embed = new EmbedBuilder()
    .setTitle('Clube Otaku | Anime & Manga')
    .setColor('#0099ff')
    .setDescription(`${GuildMember.displayName}, seja bem vindo ao servidor Clube Otaku!`)
    .setImage('https://i.imgur.com/pmglx1H.jpg')
    .setURL('https://www.youtube.com/watch?v=9hxvDnbSyAw');

  // cria o botao
  const botao = new
    ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('priamry')
        .setLabel('teste')
        .setURL("https://www.youtube.com/watch?v=9hxvDnbSyAw")
        .setStyle(ButtonStyle.Link),
    );

  // cria uma collection com todos os webhook do canal e tambem uma key que e 
  // usada para setar a primeira webhook. Por fim a mensagem que o webhook enviou
  var hook = await channel.fetchWebhooks();
  var key;
  var messageHook;

  // verifica se ja tem algum webhook, se nao tiver cria um. Em ambos o caso o valor e atribuido a variavel key
  if (hook.keyAt(0)) {
    key = hook.keyAt(0);
  } else {
    await channel.createWebhook({
      name: 'Tanya Degurechaff',
      avatar: 'https://i.imgur.com/5yA3mFX.png'
    });
    var hook = await channel.fetchWebhooks();
    key = hook.keyAt(0);
  }

  // envia a mensagem e chama exclui se tiver mais que uma. A que foi enviada nao e excluida
  hook.each(async (value) => {
    if (value.id === key) {
      messageHook = await value.send({
        content: '<@' + GuildMember.id + '>',
        embeds: [embed],
        components: [
          {
            "type": 1,
            "components": [
              {
                "type": 2,
                "style": 5,
                "label": "Youtube",
                "url": "https://www.youtube.com/watch?v=9hxvDnbSyAw"
              }
            ]
          }
        ],
      });
    }
    //deleta todo webhook que sobrar, caso tenha mais que um
    else {
      value.delete('Webhook excedente, deletando para nao dar erro');
    }
  });
} //fim export