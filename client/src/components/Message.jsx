import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ChatMessage = styled.li`
  padding: 5px 10px;
  &:hover {
    background: #eee;
  }
`;

const Message = ({message}) => {
  if (!message.hidden) {
    return (
      <ChatMessage className ="message">
        <div>
          <span><strong>{message.user}: </strong></span> {dayjs(message.date).format('h:mm a')}
        </div>
        <div>
          <p>{message.message}</p>
        </div>
      </ChatMessage>
    )
  }
  return null;
}

export default Message;