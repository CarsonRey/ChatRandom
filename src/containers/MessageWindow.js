import React, { Component } from 'react';
import Message from '../components/Message'

class MessageWindow extends Component {

  render() {

    let {messages} = this.props

    return (
      <div className="MessageWindow">
        {messages.length == false ?
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
