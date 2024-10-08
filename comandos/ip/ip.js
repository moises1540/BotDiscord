
const axios = require('axios');

const { SlashCommandBuilder } = require('discord.js');
 
/*const getPublicIP = async () => {
	try {
	  const response = await axios.get('https://api64.ipify.org?format=json');
	  const publicIP = response.data.ip;
	  console.log('Dirección IP pública:', publicIP);
	} catch (error) {
	  console.error('Error al obtener la dirección IP pública:', error.message);
	}
  };
  */
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('mine'),
	async execute(interaction) {
		const response = await axios.get('https://api.ipify.org?format=json');
		const publicIP = response.data.ip;
		await interaction.reply(publicIP);
		
	},
};

