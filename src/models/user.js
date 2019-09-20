const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  username: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
});

// create middleware for encrypting the password
userSchema.pre('save', async function (next) {
  // do stuff...
  const user = this;
  // check if the password has been changed or if it's new
  // if, neither is true we don't want to hash the password again
  if(this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      // set the password on the current document to hash
      user.password = hash
    } catch(err) {
      return next(err);
    }
  } else return next() // pass execution to next middleware
});

// create middleware to validate password with bcrypt
userSchema.methods.validatePassword = async function(password) {
  const user = this;
  // check if the password matches the hash
  const isValid = await bcrypt.compare(password, user.password);
  // return true or false
  return isValid;
}

// make sure you define your middleware before compiling model
module.exports =  mongoose.model('User', userSchema);
