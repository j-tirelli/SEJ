import React from 'react';
import Message from './Message.jsx'
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
    document.getElementById('messages').scrollTo(0,document.body.scrollHeight);
  }

  render() {
    let messageList = [];
    this.props.messages.forEach((message) => {
      messageList.push(<Message key={message._id} message={message} />)
    })

    return (
      <div>
        <List id="messages">
          {messageList}
        </List>
      </div>
    )
  }
}

export default MessageList;