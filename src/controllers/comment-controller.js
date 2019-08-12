/* Relative imports */
const Post = require('../models/post');

/* Get all comments for a post 
   expects a get request from the client with no payload
   end-point: "/api/posts/:id/comments"
*/
exports.getComments = async (req, res) => {
  const { comments } = res.post;
  res.json({ comments });
}

/**
 * Get a single comment
 * expects a get request to rom the client with no payload
 * end-point: "/api/posts/:id/comments/:comment_id"
 */
exports.getSingleComment = (req, res) => {
  // grab the post id and comment id from route params
  const { comment_id } = req.params;
  const { comments } = res.post;
  // find the comment with matches the comment_id
  const foundComment = comments.find(obj => obj._id == comment_id)
  if(foundComment !== undefined) {
    res.json({comment: foundComment})
  } else res.status(404).json({message: "comment does not exist"})
}

/* Post a comment
   expects a post request to the endpoint with payload structure like so: { body: "<insert comment string here>" }
   end-point: "/api/posts/:id/comments"
*/
exports.postComment = async (req, res) => {
  // grab text body and post id from request object
  const { body: { body }, params: { id }} =  req;
  try {    
    // update post with new comment using the $push array operator
    const updatedPost = await Post.findByIdAndUpdate(
      id, 
      { "$push": { comments: { body } } }, 
      { new: true, useFindAndModify: false }
    );
    // return the post object updated with new comment(s)
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/* Edit a comment
   expects a put request from the client with payload structure like so: { comment: "<insert edited text here>" }
   end-point: "/api/posts/:id/comments/:comment_id"
*/
exports.editComment = async (req, res) => {
  // grab the post id and comment id from the route parameters
  const { id, comment_id } = req.params;
  // grab comment from request body
  const { comment } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { "comments.$[element].body": comment }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id }}]}
      // { new: true, useFindAndModify: false }
    );
    // return a json object of the complete post with the comment updated
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

/* Delete a comment
   expects a delete request from the client with no payload
   end-point: "/api/posts/:id/comments/:comment_id"
*/
exports.deleteComment = async (req, res) => {

}

module.exports = exports;