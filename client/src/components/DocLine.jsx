import React from 'react';
import styled from 'styled-components';

const ChatMessage = styled.li`
  padding: 5px 10px;
`;

const RemoveButton = styled.button`
  background: #FFF;
  padding: 2px;
  margin-right: 20px;
  user-select: none;
  &:hover {
    background: #eee;
  };
`;

const clickHandler = (messageSelection, message) => {
  messageSelection(message);
};

const Docline = ({message, messageSelection}) => {
  return (
    <ChatMessage id={'li-' + message._id} className ="message" >
      <RemoveButton onClick={() => clickHandler(messageSelection, message)}>X</RemoveButton>{message.message}
    </ChatMessage>
  )
}

export default Docline;