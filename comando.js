const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('config').setDescription('Configurações do bot, modulos ativos e desabilitar')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('private')
				.setDescription("configurações funcionalidade private")
				.addStringOption((option) =>
					option
						.setName('connect')
						.setDescription('deseja ativar/desativar essa função?')
						.addChoices(
							{ name: 'ativar', value: 'active' },
							{ name: 'desativar', value: 'disable' },
						)
				)
				.addStringOption(option =>
					option.setName('message')
						.setDescription('personalize a mensagem')
				)
				.addStringOption(option =>
					option.setName('image')
						.setDescription('personalize a imagem')
				)
				.addStringOption(option =>
					option.setName('opcao1')
						.setDescription('adicione uma opção de suporte')
				)
				.addStringOption(option =>
					option.setName('opcao2')
						.setDescription('adicione uma opção de suporte')
				)
				.addStringOption(option =>
					option.setName('opcao3')
						.setDescription('adicione uma opção de suporte')
				)
				.addStringOption(option =>
					option.setName('opcao4')
						.setDescription('adicione uma opção de suporte')
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
	)


		
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken('token'); // alterar

rest.put(
	Routes.applicationCommands('820752194328330261'), // alterar
	{ body: commands },
)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);