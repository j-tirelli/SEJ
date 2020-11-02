const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema(
//   {
//     name: { name: String }
//     joinDate: { type: Date, default: Date.now },
//     hidden: { type: Boolean, default: false },
//   }
// );

const messageSchema = new mongoose.Schema(
  {
    message: { type: String },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false },
    user: { type: String },
    votes: { type: Number, default: 0 }
    // user: { type: [userSchema] }
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;