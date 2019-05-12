import React, { Component } from 'react';

class SignUp extends Component {

  state = {
    username: ""
  }

  render() {
    return (
      <div className="SignUp">
        <h2>Welcome to ChatRandom!</h2>
        <p>Pick a username to get started</p>
        <input
          onKeyUp={(e) => {e.keyCode === 13 && this.props.handleChange(this.state.username)} }
          type="text"
          placeholder="Super cool username!"
          onChange={(e) => this.setState({username: e.target.value})}
        />

        <div className="chat" onClick={() => this.props.handleChange(this.state.username)}>Chat</div>
      </div>
    );
  }

}

export default SignUp;
