const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var sanitize = require('mongo-sanitize');

const connect = require('../database/connection.js');
const { Login, GetAllMessages, SaveMessage, logErrorToConsole } = require('../database/index.js');
// const { User } = require('../database/User.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.get('/', express.static('/'));

app.delete('/message/id/:id', (req, res) => {
  let _id = req.body._id;
  connect.then((db) => {
    Message.deleteOne({ _id })
      .then(result => {
        console.log(result);
        res.status(204).send(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(503).send('There was an error deleting this.');
      });
  });
});

io.on('connection', (socket) => {
  socket.on('Login', async ({ name }) => {
    await connect
      .then( async (db) => {
        name = sanitize(name);
        var user = await Login(name, socket.emit);
        socket.emit('logged in', user.id);
        socket.broadcast.emit('message', `${user.name} has joined`);
        socket.emit('message', `Welcome to Social Journal, ${user.name}`);
        console.log(`${user.name} has connected`);
        var messages = await GetAllMessages();
        socket.emit('Channel Messages', messages);
      })
      .catch(logErrorToConsole);
  });


  socket.on('chat message', async ({user, message}) => {
    connect.then((db) => {
      _id = sanitize(user.userId);
      message = sanitize(message);
      SaveMessage(_id, message, user)
        .then(({ user, _doc }) => {
          _doc.user = user;
          socket.emit('new message', _doc);
          socket.broadcast.emit('new message', _doc);
        })
        .catch(logErrorToConsole);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('message', 'A user has disconnected');
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

const userSockets = {};