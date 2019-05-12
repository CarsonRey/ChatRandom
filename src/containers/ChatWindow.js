import React, { Component } from 'react';
import MessageWindow from '../containers/MessageWindow'
import TextField from '../components/TextField'


class ChatWindow extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      messages: [],
      pairedUser: null
    }
  }

  checkMessageForCommands = (message) => {
    let text = message.split(" ")

    if(text.includes("/delay")){
      let time = parseInt(text[1])
      let cutMessage = text.slice(2).join(" ")

      this.sendMessage(cutMessage, time)
    } else if (text.includes("/hop")){
      console.log("hop")
    } else{
      this.sendMessage(message);
    }

  }

  sendMessage = (message, time) => {
    if(time){
      window.setTimeout(() => {this.emitMessage(message)}, time)
    }else {
      this.emitMessage(message)
    }
  }

  emitMessage = (message) => {
    let {username} = this.state
    this.props.socket.emit('send message', {username: username, message: message})
  }

  render() {
    const {socket} = this.props

    socket.once('send message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })


    // console.log("in ChatWindow, user is: ", this.state.username)

    return (
      <div className="ChatWindow">
        <h2>ChatRandom</h2>
        <MessageWindow messages={this.state.messages} />
        <TextField sendMessage={this.checkMessageForCommands}/>
      </div>
    );
  }

}

export default ChatWindow;
