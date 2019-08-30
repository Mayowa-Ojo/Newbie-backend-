const mongoose = require('mongoose');
/* Relative imports */
const Post = require('../models/post');
const Media = require('../models/media');

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
   expects a post request from the client with payload structure like so: { title: "<enter post title>", body: "<enter post body>" }
   end-point: "/api/posts"
*/
exports.createPost = async (req, res) => {
  const { body, body: { meta: { urls } } } = req;
  // const mediaId = mongoose.Types.ObjectId("5d67bf85c4d56a21acdd689f");
  // sanitize user input
  body.title = req.sanitize(body.title);
  body.body = req.sanitize(body.body);
  const post = new Post(body);
  try {
    for(let i = 0; i < urls.length; i++) {
      // find media document related to current post
      const media = await Media.findById(mongoose.Types.ObjectId(urls[i]));
      if(media === null) {
        return res.status(404).json({message: 'media doesn\'t exist'});
      }      
      // push found media onto post document
      post.media.push(media);
    }

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
   expects a put request from the client with payload structure like so: { title: "<enter updated post title>", body: "<enter updated post body>" }
   end-point: "/api/posts/:id"
*/
exports.editPost = async (req, res) => {
  const { body, params: { id } } = req;
  // sanitize user input
  // body.title = req.sanitize(body.title);
  // body.body = req.sanitize(body.body);
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