const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const connect = require('../database/connection.js')
const Message = require('../database/Message.js');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('a user connected');
  socket.emit('message', 'Welcome to Social Journal');
  socket.broadcast.emit('message', `A user has joined`);
  connect.then((db) => {
    Message.find({}).then(chat  =>  {
      console.log(chat)
      socket.emit('Channel Messages', chat)
    });

  });

  socket.on('chat message', async (message) => {
    console.log(message);
    let user = 'John';
    connect.then((db) => {
      console.log("connected to mongoDB");
      let  chatMessage  =  new Message({ user, message });
      chatMessage.save();
      io.emit('chat message', message);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('message', `A user has disconnected`);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});