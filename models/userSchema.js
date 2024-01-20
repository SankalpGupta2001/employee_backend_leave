const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    organization: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
      },
  });
  

const User = mongoose.model('User', userSchema);
module.exports = User;

