module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`ya no es la ultima, si hago skip explotare`)
    try {
      const song = await queue.skip()
      message.channel.send(`adios popo!, ahora sigue :\n${song.name}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
