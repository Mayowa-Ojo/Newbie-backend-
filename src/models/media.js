const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String },
  slug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  timestamps: {
    createdAt: 'dateCreated',
    updatedAt: 'dateUpdated'
  }
});

module.exports = mongoose.model('Media', mediaSchema);
