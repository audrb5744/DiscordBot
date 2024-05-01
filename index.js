const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const client = new Client({ intents: [ 
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
] });
module.exports = client;

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const { REST, Routes } = require('discord.js');
const commands = [];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
	const command2 = require(`./commands/${file}`);
	commands.push(command2.data.toJSON());
}

client.once(Events.ClientReady, () => {
	console.log('================================================================');
	const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`reloading ${commands.length} files`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`reloaded ${data.length} files`);
		console.log('================================================================');
	} catch (error) {
		console.error(error);
	}
})();
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '뭔가 문제가 있어요!', ephemeral: true });
	}
});

client.login(token);