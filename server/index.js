const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const connect = require('../database/connection.js')
const Message = require('../database/Message.js');
// app.use('/', (req, res, next) => {
  // console.log(req)
//   next()
// });
app.use('/', express.static(path.join(__dirname, '..',  'client', 'dist')));
// app.get('/', express.static('/'));

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