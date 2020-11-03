import React from 'react';
import Message from './Message.jsx';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  max-height: calc(100vh - 41px);
  overflow-y: scroll;
  padding: 0;
`;

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // let height = document.getElementById('messages').scrollHeight;
    // document.getElementById('messages').scrollTo(0,height);
  }

  render() {
    let messageList = [];
    let messageSelection = this.props.messageSelection;
    let selected = this.props.selected;
    let chooseUser = this.props.chooseUser;
    this.props.messages.forEach((message) => {
      // if (selected[message._id])
      messageList.push(<Message chooseUser={chooseUser} key={message._id} message={message} messageSelection={messageSelection} selected={selected[message._id] !== undefined} />);
    });

    return (
      <div>
        <List id="messages">
          {messageList}
        </List>
      </div>
    );
  }
}

export default MessageList;