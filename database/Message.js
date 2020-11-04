const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String },
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  votes: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;