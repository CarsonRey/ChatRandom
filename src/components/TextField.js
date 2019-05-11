import React, { Component } from 'react';

class TextField extends Component {

  state = {
    message: ""
  }

  render() {
    let {message} = this.state
    let {sendMessage} = this.props

    return (
      <div className="textfield">
        <input
          type="text"
          placeholder="Type here.."
          value={message}
          onChange={(e) => { this.setState({message: e.target.value})}}
          onKeyUp={(e) => {e.keyCode === 13 && sendMessage(message)}}
        />

        <div onClick={() => {sendMessage(message)}}>Send</div>
      </div>
    );
  }

}

export default TextField;
