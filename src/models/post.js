const mongoose = require('mongoose');

/* Define database schema for the posts */
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
    default: 'Anonymous'
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      body: String,
      date: Date
    }
  ],
  meta: {
    likes: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array
    }
  }  
})

module.exports = mongoose.model('Post', postSchema);