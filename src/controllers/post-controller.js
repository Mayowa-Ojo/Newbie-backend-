/* Relative imports */
const Post = require('../models/post');

/* get all posts */
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/* Get one post */
exports.getOnePost = (req, res) => {
  res.json(res.post);
}

/* Create a post */
exports.createPost = async (req, res) => {
  const { body } = req;
  // sanitize user input
  body.title = req.sanitize(body.title);
  body.body = req.sanitize(body.body);
  const post = new Post(body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}

/* Edit a post */
exports.editPost = async (req, res) => {
  const { body, params: { id } } = req;
  // sanitize user input
  // body.title = req.sanitize(body.title);
  // body.body = req.sanitize(body.body);
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false});
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/* Delete a post */
exports.deletePost = (req, res) => {
  // const { id } = req.params;
  try {
    res.post.remove();
    res.json({message: 'successfully deleted post'});
  } catch(err) {
    res.status(500).json(err.message);
  }
}

/* Update likes for a post */
exports.updateLikes = async (req, res) => {
  const { id } = req.params;
  const { meta: { likes } } = res.post;
  const updatedLikes = {'meta.likes': likes + 1};
  // res.json({updatedLikes})
  try {
    const update = await Post.findByIdAndUpdate(id, {$set: updatedLikes}, {new: true, useFindAndModify: false});
    res.json(update);
  } catch(err) {
    res.status(500).json(err.message); 
  }
}

module.exports = exports;