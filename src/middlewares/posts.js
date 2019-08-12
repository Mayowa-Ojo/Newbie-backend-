/* Relative imports */
const Post = require('../models/post');

/* Middleware function to get a single post from database */
async function getSinglePost(req, res, next) {
  // grab post id from route params
  const { id } = req.params;
  let post;
  try {
    post = await Post.findById(id);
    // check if the post was found
    if(post === null) {
      return res.status(404).json({message: 'post doesn\'t exist'});
    }
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
  // plug the found post to the response object
  res.post = post;
  // pass execution to the next function
  next();
}

module.exports = {
  getSinglePost
}