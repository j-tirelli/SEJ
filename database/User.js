const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    token: { type: String, default: crypto.randomBytes(20).toString('hex') },
    joinDate: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;