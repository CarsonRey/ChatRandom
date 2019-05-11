import React, { Component } from 'react';
import MessageWindow from '../containers/MessageWindow'
import TextField from '../components/TextField'
import io from 'socket.io-client'

let socket = io('http://localhost:3001');



const socketUrl = ``
class ChatWindow extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      messages: []
    }
    this.socket = io('localhost:3001')
  }


  componentWillMount(){

  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log("Connected")
    })
    this.setState({
      socket: socket
    })
  }

  render() {
    console.log("in ChatWindow, user is: ", this.state.username)
    return (
      <div>
        <MessageWindow />
        <TextField handleChange={this.props.handleChange}/>
      </div>
    );
  }

}

export default ChatWindow;
