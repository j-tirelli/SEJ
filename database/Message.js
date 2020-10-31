const db = require('./connection.js');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

const Message = mongoose.model('Message', messageSchema);

const logMessage = ({ name, message }, callback = () => {}) => {
  let hidden = true;
  let meta = { votes: 0, favs: 0 };
  let date = Date.now();
  let messageObj = new Message({ name, message, hidden, meta })
  debugger;
  messageObj.save((err, data) => {
    if (err) {
      debugger;
      console.error(err);
    } else {
      debugger;
      callback(data);
    }
  });
}

module.exports.logMessage = logMessage;