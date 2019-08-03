const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  likes: {
    type: Number
  }
})

module.exports = mongoose.model('Post', postSchema);