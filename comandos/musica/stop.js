module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`aqui no hay nada, como en el corazon de tu ex!`)
    queue.stop()
    message.channel.send(`:'v chale`)
  }
}
