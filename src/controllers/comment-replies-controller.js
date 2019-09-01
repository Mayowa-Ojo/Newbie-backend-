/* Relative imports */
const Post = require('../models/post');

/* Get all replies for a comment
   expects a get request from the client with no payload
   end-point: "/api/posts/:id/comments/:comment_id/replies"
*/
exports.getCommentReplies = async (req, res) => {
  const { replies } = res.comment;
  res.json({ replies });
}

/** Get a single reply to a comment
 *  expects a get request from the client with no payload
 *  end-point: "/api/posts/:id/comments/:comment_id/replies/:reply_id"
 */

exports.getCommentReply = (req, res) => {
  const { replies } = res.comment;
  const { reply_id } = req.params;
  const foundReply = replies.find(obj => obj != null && obj._id == reply_id);
  if(foundReply == undefined) {
    res.status(404).json({message: "reply does not exist"});
  } else res.json({reply: foundReply}); 
}

/**
 * Post a reply to a comment
 * expects a post request from the client with payload like so: { content: "< enter comment reply here >"}
 * end-point: "/api/posts/:id/comments/:comment_id/replies"
 */
exports.postCommentReply = async (req, res) => {
  const { content } = req.body;
  const { id, comment_id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$push": { "comments.$[element].replies": { content } } },
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id }}]}
    );
    // return a json object of the updated post
    res.json(updatedPost);
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
}

/**
 * Edit a reply to a comment
 * expects a put request from the client with payload like so: { content: "< enter edited comment reply here >"}
 * end-point: "/api/posts/:id/comments/:comment_id/replies/:reply_id"
 */
exports.editCommentReply = async (req, res) => {
  const { content } = req.body;
  const { id, reply_id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$set": { "comments.$[].replies.$[element]": { content } } },
      // go through all replies for all comments and update where reply_id matches
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: reply_id }}]}
    );
    // return a json object of the updated post
    res.json(updatedPost);
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
}

/**
 * Delete a reply to a comment
 * expects a delete request from the client with no payload
 * end-point: "/api/posts/:id/comments/:comment_id/replies/:reply_id"
 */
exports.deleteCommentReply = async (req, res) => {
  const { id, comment_id, reply_id } = req.params;
  try {
    await Post.findByIdAndUpdate(
      id,
      { "$unset": { "comments.$[].replies.$[element]": "" }},
      { new: true, useFindAndModify: false, arrayFilters: [
        { "element._id": { $eq: reply_id }}
      ]}
    );

    // remove null values in the array because the $unset array operator replaces the element with null
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$pull": { "comments.$[element].replies": null }},
      { new: true, useFindAndModify: false, arrayFilters: [
        { "element._id": { $eq: comment_id }}
      ]}
    );

    // return a json object of the updated post
    res.json(updatedPost);
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
}

module.exports = exports;