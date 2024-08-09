module.exports = {
  name: 'rewind',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`no se puede`)
    if (!args[0]) {
      return message.channel.send(`ponme los segundos que quieras regresar`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`ingresa un numero valido`)
    queue.seek((queue.currentTime - time))
    message.channel.send(`atras en ${time}!`)
  }
}
