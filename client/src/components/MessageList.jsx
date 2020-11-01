import React from 'react';
import Message from './Message.jsx'

const MessageList = (props) => {
  let messageList = [];
  props.messages.forEach((message) => {
    messageList.push(<Message key={message._id} message={message} />)
  })
  return (
    <ul id="messages">
      {messageList}
    </ul>
  )
}

export default MessageList;