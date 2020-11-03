import React from 'react';
import MessageList from './MessageList.jsx';
import AddMessage from './AddMessage.jsx';
import DocHeader from './DocHeader.jsx';
import Document from './Document.jsx';
import Signon from './Signon.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docOn: false,
      messages: [],
      selected: {},
      user: 'John'
    };
  }

  submitHandler(message) {
    let user = this.state.user;
    var socket = io();
    socket.emit('chat message', {message, user});
  }

  addNewMessage (message) {
    let messages = JSON.parse(JSON.stringify(this.state.messages));
    messages.push(message);
    this.messagePopulator(messages);
  }

  messagePopulator(messages) {
    this.setState({messages});
  }

  messageSelected(message) {
    let selected = JSON.parse(JSON.stringify(this.state.selected));
    if ( selected[message._id] ) {
      delete selected[message._id];
    } else {
      selected[message._id] = message;
    }
    if (Object.keys(selected).length === 0) {
      this.setState({ selected, docOn: false });
    } else {
      this.setState({ selected });
    }
  }

  componentDidMount() {
    var socket = io();
    socket.on('Channel Messages', this.messagePopulator.bind(this));
    socket.on('new message', this.addNewMessage.bind(this));
  }

  docToggle() {
    this.setState({docOn: !this.state.docOn });
  }

  closeSelection() {
    this.setState({docOn: false, selected: {} });
  }

  changeUser(user) {
    this.setState({ user });
  }

  chooseUser(user) {
    let selected = JSON.parse(JSON.stringify(this.state.selected));
    for (let val of this.state.messages) {
      if (val.user === user) {
        selected[val._id] = val;
      }
    }
    this.setState({ selected });
  }

  render() {
    if (this.state.user === '') {
      return <Signon changeUser={this.changeUser.bind(this)} />;
    } else if (this.state.docOn) {
      return (
        <div>
          <DocHeader docToggle={this.docToggle.bind(this)} close={this.closeSelection.bind(this)} buttonMsg='Return to chat to select more'/>
          <Document messageSelection={this.messageSelected.bind(this)} selected={this.state.selected} docToggle={this.docToggle.bind(this)} />
        </div>
      );
    } else if (Object.keys(this.state.selected).length > 0) {
      return (
        <div>
          <DocHeader docToggle={this.docToggle.bind(this)} close={this.closeSelection.bind(this)} buttonMsg='Create Document from selected Chats'/>
          <MessageList chooseUser={this.chooseUser.bind(this)} messageSelection={this.messageSelected.bind(this)} messages={this.state.messages} selected={this.state.selected} />
          <AddMessage submitHandler={this.submitHandler.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div>
          <MessageList chooseUser={this.chooseUser.bind(this)} messageSelection={this.messageSelected.bind(this)} messages={this.state.messages} selected={this.state.selected} />
          <AddMessage submitHandler={this.submitHandler.bind(this)}/>
        </div>
      );
    }
  }
}

export default App;