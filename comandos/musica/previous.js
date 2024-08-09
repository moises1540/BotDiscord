module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`si no puedo ir hacia adelante como podre ir hacia atras`)
    const song = queue.previous()
    message.channel.send(`que mejor otra vez dice:\n${song.name}`)
  }
}
