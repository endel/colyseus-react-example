import React from "react";
import {render, findDOMNode} from 'react-dom';

import Colyseus from 'colyseus.js'

class Main extends React.Component {

  constructor() {
    super();

    // use current hostname/port as colyseus server endpoint
    var endpoint = location.protocol.replace("http", "ws") + "//" + location.hostname;

    // development server
    if (location.port && location.port !== "80") { endpoint += ":2657" }

    this.colyseus = new Colyseus(endpoint)
    this.chatRoom = this.colyseus.join('chat', { channel: window.location.hash || "#default" })
    this.chatRoom.on('update', this.onUpdateRemote.bind(this))

    this.state = {
      currentText: "",
      messages : []
    };
  }

  onUpdateRemote (newState, patches) {
    console.log("new state: ", newState, "patches:", patches)
    this.setState(newState, this.autoScroll.bind(this))
  }

  autoScroll () {
    var domMessages = findDOMNode(this.refs.messages)
    domMessages.scrollTop = domMessages.scrollHeight
  }

  onInputChange (e) {
    e.preventDefault()

    this.setState({ currentText: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    this.chatRoom.send(this.state.currentText)
    this.setState({currentText: ""})
  }

  render() {
    return <div>

      <div id="messages" ref="messages">
      { this.state.messages.map((message, i) => {
        return <p key={i}>{ message }</p>
      }) }
      </div>

      <form id="form" onSubmit={this.onSubmit.bind(this)}>
        <input id="input" type="text" onChange={this.onInputChange.bind(this)} value={this.state.currentText} />
        <button type="submit">send</button>
      </form>
    </div>
  }

}

render((
  <Main/>
), document.getElementById('main'));
