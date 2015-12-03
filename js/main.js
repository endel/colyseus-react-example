import React from "react";
import {render, findDOMNode} from 'react-dom';

import Colyseus from 'colyseus.js'

class Main extends React.Component {

  constructor() {
    super();

    this.colyseus = new Colyseus("ws://localhost:2657")
    this.chatRoom = this.colyseus.join('chat')
    this.chatRoom.on('setup', this.onUpdateRemote.bind(this))
    this.chatRoom.on('update', this.onUpdateRemote.bind(this))
    this.chatRoom.on('patch', this.onPatchRemote.bind(this))

    this.state = {
      currentText: "",
      messages : []
    };
  }

  onUpdateRemote (newState) {
    console.log("new state: ", newState)
    this.setState(newState, this.autoScroll.bind(this))
  }

  autoScroll () {
    var domMessages = findDOMNode(this.refs.messages)
    domMessages.scrollTop = domMessages.scrollHeight
  }

  onPatchRemote (patches) {
    console.log("Patch: ", patches)
  }

  onInputChange (e) {
    e.preventDefault()

    this.setState({ currentText: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    this.colyseus.send(this.state.currentText)
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
