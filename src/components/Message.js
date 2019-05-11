import React from 'react';

const Message = ({message}) => (
  <div>
    <p><span>{message.username}</span>: {message.text}</p>
  </div>
);

export default Message;
