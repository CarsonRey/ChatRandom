import React from 'react';
import ChatWindow from './containers/ChatWindow'
import SignUp from './components/SignUp'
import './App.css';

class App extends React.Component {

  state = {
    username: null

  }

  handleChange = (username) => {
    this.setState({
      username: username
    }, () => console.log(this.state.username))
  }

  render(){
    return (
      <div className="App">
      {this.state.username === null ? <SignUp handleChange={this.handleChange}/> : <ChatWindow username={this.state.username} />  }
      </div>
    );
  }

}

export default App;
