module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`me queda claro que no sabes como funciona el volumen`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`ese no es un numero valido`)
    queue.setVolume(volume)
    message.channel.send(`Volumen \`${volume}\``)
  }
}
