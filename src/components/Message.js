import React from 'react';

const Message = ({isNotification, message}) => (
  <div className="Message">

    { isNotification ?
      <p><span>{message.message}</span></p>
      :
      <p><span>{message.username}</span>: {message.message}</p>
    }

  </div>
);

export default Message;
