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
    pairedUser: null
  }

  handleChange = (username) => {
    this.setState({
      username: username
    }, () => socket.emit('set user', this.state.username))
  }

  render(){

    socket.once('set user', (user)=> {
      this.setState({
        pairedUser: user
      }, ()=> {console.log("HOLLERRR")})
    })

    return (
      <div className="App">
      {this.state.username === null ? <SignUp handleChange={this.handleChange}/> : <ChatWindow socket={io(this.state.endpoint)} username={this.state.username} />  }
      </div>
    );
  }

}

export default App;
