import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ChatMessage = styled.li`
  background: ${props => (props.selected ? '#eee' : '#fff')};
  margin-left: ${props => (props.selected ? '20px' : '0')};
  padding: 5px 10px;
  &:hover {
    background: #eee;
  };
`;

const clickHandler = (e, messageSelection, message) => {
  messageSelection(message);
};

const clickUser = (e, user, chooseUser) => {
  e.stopPropagation();
  if (e.ctrlKey) {
    chooseUser(user);
  }
}

const Message = ({message, messageSelection, selected, chooseUser }) => {
  if (!message.hidden) {
    return (
      <ChatMessage id={'li-' + message._id} className ="message" onClick={(e) => clickHandler(e, messageSelection, message)} selected={selected}>
        <span onClick={(e) => clickUser(e, message.user, chooseUser)}><strong>{message.user}: </strong></span> {dayjs(message.date).format('h:mm a')}<p>{message.message}</p>
      </ChatMessage>
    )
  }
  return null;
}

export default Message;