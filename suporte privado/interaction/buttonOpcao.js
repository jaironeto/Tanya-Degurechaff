const type = require('../../public/security/Security_verifyArguments');
const sendDMClient = require('../../public/functions/sendChannelClient');
const buscarGuildPrivate = require('../data/buscarGuildPrivate');
const buscarUserPrivate = require('../data/buscarUserPrivate');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Webhook } = require('discord.js');
const userPrivate = require('../data/userPrivate');
const _deleteUserPrivate = require('../data/_deleteUserPrivate');

module.exports = async function buttonOpcao(interaction) {

    let userSQL, msgReply, guildSQL, msgDM;

    try {
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('fechar').setLabel('Encerrar Suporte').setStyle(ButtonStyle.Danger))
        await interaction.editReply({ components: [row] });

        userSQL = await buscarUserPrivate(interaction?.user.id);
        type.isUndefined(userSQL);

        guildSQL = await buscarGuildPrivate(userSQL?.get('guild'));
        type.isUndefined(guildSQL);

        const channelId = guildSQL.get(`canal${interaction?.customId?.at(-1)}`);
        type.isUndefined(channelId);

        msgReply = await (await interaction.client.channels.fetch(channelId)).send(`O usuario <@${interaction.user.id}> solicitou suporte`);
        type.isUndefined(msgReply);

        msgDM = interaction.channel.send('suporte iniciado com sucesso!')
        type.isUndefined(msgDM);

        await userPrivate({
            user: interaction.user.id, status: 'ativo',
            replyGuildJSON: msgReply
        }, userSQL);

    } catch (e) {
        console.log('errror' + e + e.stack);
        if (userSQL) { await _deleteUserPrivate(userSQL.get('user')) }
        await msgReply.delete();
        await msgDM.delete();
        throw e;
    }
}