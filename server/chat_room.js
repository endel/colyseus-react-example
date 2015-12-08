var Room = require('colyseus').Room

class ChatRoom extends Room {

  constructor (options) {
    // call 'update' method each 100ms
    options.updateInterval = 100
    super(options, { messages: [] })
  }

  onJoin (client) {
    this.sendState(client)
    this.state.messages.push(`${ client.id } joined. Say hello!`)
  }

  onMessage (client, data) {
    this.state.messages.push(`${ client.id }: ${ data }`)
  }

  update () {
    // broadcast patched state to all clients
    this.broadcast()
  }

  onLeave (client) {
    this.state.messages.push(`${ client.id } leaved.`)
  }

  dispose () {}
}

module.exports = ChatRoom
