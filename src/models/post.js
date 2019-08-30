const mongoose = require('mongoose');

/* Define database schema for the posts */
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  date: { type: Date, default: Date.now },  
  comments: [
    {
      body: String,
      // body: {type: String, minlength: 1, maxlength: 10},
      date: { type: Date, default: Date.now },
      replies: [
        {
          text: String,
          date: { type: Date, default: Date.now }
        }
      ],
      likes: { type: Number, default: 0 }
    }
  ],
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media'
    }
  ],
  meta: {
    likes: { type: Number, default: 0 },
    tags: { type: Array },
    mediaIds: { type: Array }
  }
});

module.exports = mongoose.model('Post', postSchema);