const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wenas')
		.setDescription('manda saludo'),
	async execute(interaction) {
		await interaction.reply(`muy wenas mi estimadisimo!`);
	},
};

