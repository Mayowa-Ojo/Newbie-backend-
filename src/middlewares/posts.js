const Post = require('../models/post');

async function getSinglePost(req, res, next) {
  const { id } = req.params;
  let post;
  try {
    post = await Post.findById(id);
    if(post === null) {
      return res.status(404).json({message: 'post doesn\'t exist'});
    }
  } catch(err) {
    res.status(500).json({message: err.message});
  }
  res.post = post;
  next();
}

module.exports = {
  getSinglePost
}