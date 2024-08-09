module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | `)
    if (queue.paused) {
      queue.resume()
      message.channel.send('con gusto le ponemos su musica mi estimado')
    } else {
      message.channel.send('Debes subir el volumen o algo pq si esta sonando algo')
    }
  }
}
