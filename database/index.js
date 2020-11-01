const Message = require('./Message.js');

const logMessage = ({ name, message }, callback = () => {}) => {
  let hidden = false;
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

module.exports = {
  logMessage
}