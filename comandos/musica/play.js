module.exports = {
	name: 'play',
	aliases: ['p'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
	  const string = args.join(' ')
	  if (!string) return message.channel.send(`aja si, pero pasame la url o el nombre de la cancion :3`)
	  client.distube.play(message.member.voice.channel, string, {
		member: message.member,
		textChannel: message.channel,
		message
	  })
	}
  }
  