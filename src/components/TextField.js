import React, { Component } from 'react';

class TextField extends Component {

  state = {
    message: ""
  }

  sendMessageAndClearState = (e, message) => {
    if (e && e.keyCode === 13){
      this.props.sendMessage(message)
      this.clearTextField()
    }
  }

  clearTextField = () => {
    this.setState({
      message: ""
    })
  }

  render() {
    let {message} = this.state
    let {sendMessage} = this.props

    return (
      <div className="TextField">
        <textarea
          type="textarea"
          placeholder="Type here.."
          value={message}
          onChange={(e) => { this.setState({message: e.target.value})}}
          onKeyUp={(e) => {this.sendMessageAndClearState(e, message)}}
        />

        <div className="send" onClick={(e) => {sendMessage(message); this.clearTextField(); }}>Send</div>
      </div>
    );
  }

}

export default TextField;
