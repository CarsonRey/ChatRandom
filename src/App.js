import React from 'react';
import ChatWindow from './containers/ChatWindow'
import SignUp from './components/SignUp'
import './App.css';
import io from 'socket.io-client'

let socket = io('http://localhost:3001');

class App extends React.Component {

  state = {
    username: null,
    endpoint: "localhost:3001",
    room: null
  }


  joinRoom = (username) => {
    this.setState({
      username: username
    }, () => socket.emit('join room', this.state.username))
  }

  render(){
    // socket.once('send room', (data) => {
    //   this.setState({
    //      room: data.room
    //    })
    // })
    // socket.once('join room', (data)=> {
    //   console.log("IN APP JS HITTING JOIN ROOM")
    //   this.setState({
    //     room: data.room
    //   }, ()=> {console.log("HOLLERRR")})
    // })

    return (
      <div className="App">
        {/* <ChatWindow socket={io(this.state.endpoint)} username={this.state.username} /> */}
      {this.state.username === null ? <SignUp handleChange={this.joinRoom}/> : <ChatWindow room={this.state.room} socket={io(this.state.endpoint)} username={this.state.username} />  }
      </div>
    );
  }

}

export default App;
