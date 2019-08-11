/* Relative imports */
const Post = require('../models/post');

/* Get all comments for a post */
exports.getComments = async (req, res) => {
  const { comments } = res.post;
  res.json({ comments });
}

/* Post a comment */
exports.postComment = async (req, res) => {
  // grab text body and post id from request object
  const { body: { body }, params: { id }} =  req;
  try {    
    // update post with new comment using the $push array operator
    const updatedPost = await Post.findByIdAndUpdate(id, {"$push": {comments: { body }}}, {new: true, useFindAndModify: false });
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/* Edit a comment */
exports.editComment = async (req, res) => {

}

/* Delete a comment */
exports.deleteComment = async (req, res) => {

}

module.exports = exports;