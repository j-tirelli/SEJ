import React from 'react';
import dayjs from 'dayjs';

const Message = ({message}) => {
  debugger
  if (!message.hidden) {
    return (
      <li className ="message">
        <div>
          <span><strong>{message.user}: </strong></span> {dayjs(message.date).format('h:mm a')}
        </div>
        <div>
          <p>{message.message}</p>
        </div>
        <div>

        </div>
      </li>
    )
  }
  return null;
}

// { name, date, message, hidden, meta }

export default Message;