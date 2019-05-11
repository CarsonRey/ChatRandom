import React, { Component } from 'react';
import MessageWindow from '../containers/MessageWindow'
import TextField from '../components/TextField'
import io from 'socket.io-client'

let socket = io('http://localhost:3001');




class ChatWindow extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      messages: [],
      endpoint: "localhost:3001"
    }
    // this.socket = io('localhost:3001')
  }


  componentDidMount(){

  }

  initSocket = () => {

    socket.on('connect', () => {
      console.log("Connected")
    })
    // this.setState({
    //   socket: socket
    // })
  }

  sendMessage = (message) => {
    let {username} = this.state
    socket.emit('send message', {username: username, message: message})
  }



  render() {
    const socket = io(this.state.endpoint)
    socket.once('send message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    } )
    console.log("in ChatWindow, user is: ", this.state.username)

    return (
      <div>
        <MessageWindow messages={this.state.messages} />
        <TextField sendMessage={this.sendMessage}/>
      </div>
    );
  }

}

export default ChatWindow;
