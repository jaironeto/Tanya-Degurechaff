const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('suporte').setDescription('inicia ou encerra um suporte prestado a um membro por dm')
		.addStringOption((option) =>
			option
				.setName('opções')
				.setDescription('deseja iniciar ou encerra um suporte por DM?')
				.addChoices(
					{ name: 'start', value: 'start' },
					{ name: 'close', value: 'exit' },
					{ name: 'listing', value: 'list' },
					{ name: 'pending', value: 'pendente' }
				)
				.setRequired(true)
		)
		.addUserOption(option =>
			option
				.setName('member')
				.setDescription('selecione um membro')
		),
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
		)

	,
	new SlashCommandBuilder().setName('bump').setDescription('Status de servidores parceiros'),
	new SlashCommandBuilder().setName('partner').setDescription('Sistema de parceria'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken('ODIwNzUyMTk0MzI4MzMwMjYx.GVX52b.K6ohy3-PLRsitVuzWDD0xzgmOTeod9sKHiffbc');

rest.put(
	Routes.applicationCommands('820752194328330261'),
	{ body: commands },
)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);