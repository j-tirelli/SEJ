var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Message = require('../database/Message.js');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('a user connected');
  socket.emit('message', 'Welcome to Social Journal');
  socket.broadcast.emit('message', `A user has joined`);


  socket.on('chat message', async (message) => {
    console.log(message);
    let name = 'John';
    await Message.logMessage({ name, message }, (results) => {
      io.emit('chat message', message);
    })
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('message', `A user has disconnected`);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});