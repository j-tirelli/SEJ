const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema(
//   {
//     name: { name: String }
//     joinDate: { type: Date, default: Date.now },
//     hidden: { type: Boolean, default: false },
//   }
// );

// const metaSchema = new mongoose.Schema(
//   {
//     votes: { type: Number },
//     favs: { type: Number }
//   }
// );

const messageSchema = new mongoose.Schema(
  {
    message: { type: String },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false },
    user: { type: String }
    // user: { type: [userSchema] }
    // meta: { type: [metaSchema] }
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;