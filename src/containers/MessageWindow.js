import React, { Component } from 'react';
import Message from '../components/Message'

class MessageWindow extends Component {

  componentDidMount(){
    this.scrollToBottom()
  }

  componentDidUpdate(){
    this.scrollToBottom()
  }

  scrollToBottom(){
    if(this.messagesEnd){
      this.messagesEnd.current.scrollIntoView({behavior: 'smooth'})
    }
  }

  render() {

    let {messages} = this.props

    return (
      <div className="MessageWindow">
        {messages.length == false ?
        <div>What are you waiting for? Send a message!</div>
          :
        <div >
          {messages.map((message, idx) => <Message isNotification={message.notification} key={idx} message={message} />)}
          <div ref={this.messagesEnd}/>
        </div>
        }
      </div>
    );
  }

}

export default MessageWindow;
