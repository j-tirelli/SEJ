import React from 'react';
import MessageList from './MessageList.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }


  componentDidMount() {
    var socket = io();
    $(function () {
      $('form').submit(function(e){
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
    });
    socket.on('Channel Messages', (messages) => {
      this.setState({messages})
      // allMessages.forEach((message) => {
      //   $('#messages').append($('<li>').text(message.message));
      // })
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <form action="">
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }

}

export default App;