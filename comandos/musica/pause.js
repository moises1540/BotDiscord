module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`no puedo detener el tiempo :/ \n solo la música y no esta sonando nada`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('hagase la quitese la pausasion')
    }
    queue.pause()
    message.channel.send('hagase la pausasion')
  }
}
