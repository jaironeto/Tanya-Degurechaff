const { SlashCommandBuilder } = require('@discordjs/builders');
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('config').setDescription('Configurações do bot, modulos ativos e desabilitar')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('private')
				.setDescription("configurações funcionalidade private")
				.addStringOption(option =>
					option.setName('message')
						.setDescription('personalize a mensagem')
				)
				.addStringOption(option =>
					option.setName('image')
						.setDescription('personalize a imagem')
				)
				.addStringOption(option =>
					option.setName('opcao')
						.setDescription('adicione uma opção de suporte')
				).addStringOption((option) =>
					option
						.setName('connection')
						.setDescription('deseja desativar essa função?')
						.addChoices(
							{ name: 'ativar', value: 'ativarPrivate' },
							{ name: 'desativar', value: 'desativarPrivate' },
						)
				)
		).addSubcommand((subcommand) =>
			subcommand
				.setName('partner')
				.setDescription("configurações funcionalidade partner")
				.addStringOption((option) =>
					option
						.setName('connect')
						.setDescription('deseja ativar/desativar essa função?')
						.addChoices(
							{ name: 'ativar', value: 'ativarPartner' },
							{ name: 'desativar', value: 'desativarPartner' },
						)
				).addRoleOption(option =>
					option.setName('cargo')
						.setDescription('adicione um cargo ping pro bot mencionar a cada parceria realizada'),
				).addIntegerOption(option =>
					option.setName('intervalo')
						.setDescription('adicione um intervalo de renovação de parceria entre 1 a 30 dias [por padrão e 7]'),
				).addIntegerOption(option =>
					option.setName('membros')
						.setDescription('adicione um quantidade minima de membro aceitavel entre 5 e 100000 [por padrão e 5]'),
				)
		).addSubcommand((subcommand) =>
			subcommand
				.setName('disboard')
				.setDescription("configurações funcionalidade partner")
				.addStringOption((option) =>
					option
						.setName('desativar')
						.setDescription('desativa o disboard')
				).addRoleOption(option =>
					option.setName('ativar')
						.setDescription('ativa o disboard no canal atual e adicione um cargo ping pro bot mencionar a cada intervalo de bump'),
				)
		).setDMPermission(false).setDefaultMemberPermissions(0x0000000000002000),

	new ContextMenuCommandBuilder()
		.setName('status')
		.setType(ApplicationCommandType.Message)
		.setDMPermission(false)
		.setDefaultMemberPermissions(0x0000000000002000),

	new ContextMenuCommandBuilder()
		.setName('iniciar')
		.setType(ApplicationCommandType.Message)
		.setDMPermission(false)
		.setDefaultMemberPermissions(0x0000000000002000),

	new ContextMenuCommandBuilder()
		.setName('finalizar')
		.setType(ApplicationCommandType.Message)
		.setDMPermission(false)
		.setDefaultMemberPermissions(0x0000000000002000)

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken('ODIwNzUyMTk0MzI4MzMwMjYx.GJsJLu.Kz-k6E2qa-LnMDxrhDY1rV-ceVj2aRg_f0Oa58'); // alterar

rest.put(
	Routes.applicationCommands('820752194328330261'), // alterar
	{ body: commands },
)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);