import React from 'react';
import MessageList from './MessageList.jsx'
import AddMessage from './AddMessage.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: 'John'
    }
  }

  submitHandler(message) {
    let user = this.state.user;
    var socket = io();
    socket.emit('chat message', {message, user});
  }

  addNewMessage (message) {
    let messages = JSON.parse(JSON.stringify(this.state.messages));
    messages.push(message);
    messagePopulator(messages);
  }

  messagePopulator(messages) {
    this.setState({messages});
  }

  componentDidMount() {
    var socket = io();
    socket.on('Channel Messages', this.messagePopulator.bind(this));
    socket.on('new message', this.addNewMessage.bind(this));
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <AddMessage submitHandler={this.submitHandler.bind(this)}/>
      </div>
    )
  }

}

export default App;