const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String },
  slug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
