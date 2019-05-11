import React, { Component } from 'react';
import Message from '../components/Message'

class MessageWindow extends Component {

  state = {
    messages:[]
  }

  render() {

    let {messages} = this.state

    return (
      <div className="MessageWindow">
        {this.state.messages.length == false ?
        <div>What are you waiting for? Send a message!</div>
          :
        <div>
          {messages.map((message, idx) => <Message key={idx} message={message} />)}
        </div>
        }
      </div>
    );
  }

}

export default MessageWindow;
