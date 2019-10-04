const mongoose = require('mongoose');
/* Relative imports */
const Post = require('../models/post');
const Media = require('../models/media');
const User = require('../models/user');

/* get all posts
   expects a get request from the client with no payload
   end-point: "/api/posts/"
*/
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/* Get one post
   expects a get request from the client with no payload
   end-point: "/api/posts/:id"
*/
exports.getPost = (req, res) => {
  res.json(res.post);
}

/* Create a post
   expects a post request from the client with payload structure like so: { title: "<insert post title>", content: "<insert post content>" }
   end-point: "/api/posts"
*/
exports.createPost = async (req, res) => {
  const { body, body: { meta: { mediaIds, authorId } }} = req;
  
  // sanitize user input
  // body.title = req.sanitize(body.title);
  // body.content = req.sanitize(body.content);
  const post = new Post(body);
  try {
    if(mediaIds.length >= 1) {       
      for(let i = 0; i < mediaIds.length; i++) {
        // find media document related to current post
        const media = await Media.findById(mongoose.Types.ObjectId(mediaIds[i]));
        if(media === null) {
          return res.status(404).json({message: 'media doesn\'t exist'});
        }      
        // push found media onto post document
        post.media.push(media);
      }
    }
    // find author of current post
    const user = await User.findById(mongoose.Types.ObjectId(authorId));
    if(user === null) return res.status(404).json({message: 'user not found'});
    post.author = { id: user._id, username: user.username };

    // save post to database
    const newPost = await post.save();

    // return post object to client
    res.status(201).json(newPost);
  } catch(err) {
    // handle potential errors
    res.status(400).json({message: err.message});
  }
}

/* Edit a post
   expects a put request from the client with payload structure like so: { title: "<insert updated post title>", content: "<insert updated post content>" }
   end-point: "/api/posts/:id"
*/
exports.editPost = async (req, res) => {
  const { body, params: { id } } = req;
  // sanitize user input
  // body.title = req.sanitize(body.title);
  // body.content = req.sanitize(body.content);
  try {
    // update post in the database
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false});
    // return updated post to client
    res.json(updatedPost);
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
}

/* Delete a post
   expects a delete request from the client with no payload
   end-point: "/api/posts/:id"
*/
exports.deletePost = (req, res) => {
  // const { id } = req.params;
  try {
    res.post.remove();
    res.json({message: 'successfully deleted post'});
  } catch(err) {
    res.status(500).json(err.message);
  }
}

/* Update likes for a post
   expects a put request from the client with no payload
   end-point: "/api/posts/:id/likes"
*/
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