var Room = require('colyseus').Room

class ChatRoom extends Room {
  constructor (options) {
    // call 'update' method each 50ms
    super(options)

    this.channel = options.channel;

    this.setPatchRate(1000 / 20);

    this.setState({
      messages: [ `Welcome to ${ options.channel } ChatRoom instance.` ]
    })
  }

  requestJoin (options) {
    return options.channel === this.channel;
  }

  onJoin (client) {
    console.log(client.id, "joined ChatRoom!")
    this.state.messages.push(`${ client.id } joined. Say hello!`)
  }

  onMessage (client, data) {
    console.log(client.id, "sent message on ChatRoom")
    this.state.messages.push(`${ client.id }: ${ data }`)
  }

  onLeave (client) {
    console.log(client.id, "left ChatRoom")
    this.state.messages.push(`${ client.id } left.`)
  }
}

module.exports = ChatRoom
