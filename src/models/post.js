const mongoose = require('mongoose');

/* Define database schema for the posts */
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  timestamps: {
    createdAt: 'dateCreated',
    updatedAt: 'dateUpdated'
  }, 
  comments: [
    {
      content: String,
      // body: {type: String, minlength: 1, maxlength: 10},
      timestamps: {
        createdAt: 'dateCreated',
        updatedAt: 'dateUpdated'
      },
      replies: [
        {
          content: String,
          timestamps: {
            createdAt: 'dateCreated',
            updatedAt: 'dateUpdated'
          }
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