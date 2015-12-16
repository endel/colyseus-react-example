var Room = require('colyseus').Room

class ChatRoom extends Room {
  constructor (options) {
    // call 'update' method each 50ms
    super(options, 1000 / 20)

    this.setState({ messages: [] })
  }

  onJoin (client) {
    this.sendState(client)
    this.state.messages.push(`${ client.id } joined. Say hello!`)
  }

  onMessage (client, data) {
    this.state.messages.push(`${ client.id }: ${ data }`)
  }

  onLeave (client) {
    this.state.messages.push(`${ client.id } leaved.`)
  }
}

module.exports = ChatRoom
