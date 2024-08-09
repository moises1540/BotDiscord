// Require the necessary discord.js classes------------------------------------------------------------------------------------
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js')
const { token } = require('./config.json');
const { DisTube } = require('distube')
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");

//const publicIp =require("public-ip");
//import publicIp from 'public-ip';
//const publicIpv4 = (...args) => import("public-ip").then(({default: fetch}) => fetch(...args));



  // Llamamos a la función para obtener la dirección IP pública
  

// Create a new client instance------------------------------------------------------------------------------------
const fs = require('node:fs');
const path = require('node:path');

const client = new Discord.Client({
	intents: [
	  Discord.GatewayIntentBits.Guilds,
	  Discord.GatewayIntentBits.GuildMessages,
	  Discord.GatewayIntentBits.GuildVoiceStates,
	  Discord.GatewayIntentBits.MessageContent
	]
  })

client.distube = new DisTube(client, {
	leaveOnStop: false,
	leaveOnEmpty:true,
	nsfw:true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	new YtDlpPlugin(),
	new SpotifyPlugin()
	]
  })

// comandos------------------------------------------------------------------------------------
client.commands = new Collection();
client.aliases = new Discord.Collection()
const config = require('./config.json')

const foldersPath = path.join(__dirname, '/comandos');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//Comandos distubee
fs.readdir('./comandos/musica/', (err, files) => {
	if (err) return console.log('Could not find any commands!')
	const jsFiles = files.filter(f => f.split('.').pop() === 'js')
	if (jsFiles.length <= 0) return console.log('Could not find any commands!')
	jsFiles.forEach(file => {
	  const cmd = require(`./comandos/musica/${file}`)
	  console.log(`Loaded ${file}`)
	  client.commands.set(cmd.name, cmd)
	  if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
	})
  })

client.on('messageCreate', async message => {
	if (message.author.bot || !message.guild) return
	const prefix = config.prefix
	if (!message.content.startsWith(prefix)) return
	const args = message.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
	if (!cmd) return
	if (cmd.inVoiceChannel && !message.member.voice.channel) {
	  return message.channel.send(`para que la pongo si no estas en un canal para que la escuches :p`)
	}
	try {
	  cmd.run(client, message, args)
	} catch (e) {
	  console.error(e)
	  message.channel.send(` Error: \`${e}\``)
	}
  })

  const status = queue =>
  `Volumen: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      ` Reproduciendo: \`${song.name}\` - \`${song.formattedDuration}\`\nAgregado por: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
  queue.textChannel.send(
	`| Se Agregó: ${song.name} - \`${song.formattedDuration}\` por: ${song.user}`
  )
)
.on('addList', (queue, playlist) =>
  queue.textChannel.send(
	` | Se Agregó: \`${playlist.name}\` playlist (${
	  playlist.songs.length
	} canciones)faltan \n${status(queue)}`
  )
)
.on('error', (channel, e) => {
  if (channel) channel.send(`| ocurrio un error con la musica: ${e.toString().slice(0, 1974)}`)
  else console.error(e)
})
.on('empty', channel => channel.send('Amonos pues...'))
.on('searchNoResult', (message, query) =>
  message.channel.send(` No se de que habla compa \`${query}\`!`)
)


//oyente de interacciones1------------------------------------------------------------------------------------
/*client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});


client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});*/

//oyente de interacciones2------------------------------------------------------------------------------------
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matchinginttrrr ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'creo que falto terminar este comando XC', ephemeral: true });
		} else {
			await interaction.reply({ content: 'creo que falto terminar este comando XC', ephemeral: true });
		}
	}
});
//------------------------------------------------------------------------------------------------------------




// Mensaje cuando esta listo el bot
client.once(Events.ClientReady, c => {
	console.log('izzi');
	
});

// token
client.login(token);