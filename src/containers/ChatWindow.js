import React, { Component } from 'react';
import MessageWindow from '../containers/MessageWindow'
import TextField from '../components/TextField'
import {connect} from 'react-redux'
import {updateUserRoom} from '../store/actions'

class ChatWindow extends Component {


    state = {
      messages: [],
      room: null,
      users: null,
      other: ""
    }


  shouldComponentUpdate(nextProps, nextState){
    debugger
    // only update if we don't have a room
    return this.state.room !== null || (this.state.users !== nextState.users)
  }

  checkMessageForCommands = (message) => {
    let text = message.split(" ")

    if(text.includes("/delay")){
      let time = parseInt(text[1])
      let trimmedMessage = text.slice(2).join(" ")

      this.sendMessage(trimmedMessage, time)
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
    let {username} = this.props
    this.props.socket.emit('send message', {username: username, message: message, notification: false, room: this.state.room})
  }

  userIsInThisRoom = (users, correctUser) => {
    let {username} = this.props

    if (this.state.users){
      return this.state.users[username] === correctUser
    }


  }

  listenForSpecificMessage = (users, room) => {
    // console.log("IN CHAT WINDOW, ROOM IS: ", room, "and the user should be able to see this")
    // debugger
    if (this.userIsInThisRoom(users, room)){
      this.props.socket.once('send message', (message) => {
        // console.log(message.test)
        this.setState({
          messages: [...this.state.messages, message]
        }, () => {console.log(this.state.messages)})
      })
    }
  }

  render() {
    const {socket} = this.props

    if (!this.state.room) {
      socket.once('send room', (data) => {
        // debugger
      // this.props.updateUserRoom({user: data.user, room: data.room})
        this.setState({
           room: data.room,
           users: data.users,
           other: "test"
         }, () => this.listenForSpecificMessage(data.users, this.state.room))
      })
    } else if (this.state.room){
      this.listenForSpecificMessage(this.state.users, this.state.room)
    }

    if(this.state.users){
  this.props.socket.emit('update users', this.state.users)
  this.props.socket.once('update users', (data) => {
    // debugger
    this.setState({
      users: data.users
    })
  })
}





console.log("props",this.props)
console.log("state",this.state)

    return (
      <div className="ChatWindow">
        <h2>ChatRandom</h2>
        <MessageWindow messages={this.state.messages} />
        <TextField sendMessage={this.checkMessageForCommands}/>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserRoom: (data) => dispatch(updateUserRoom(data))
  }
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.users
//   }
// }

export default connect(null, mapDispatchToProps)(ChatWindow);
