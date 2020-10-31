const mongoose = require('mongoose');
const url = 'mongodb://localhost/chat';
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = connect;