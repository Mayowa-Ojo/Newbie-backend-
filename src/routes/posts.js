const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { getSinglePost } = require('../middlewares/posts');
const seedData = require('../public/assets/seedData');

/* setup posts routes */
/* get all posts */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

/* get one post */
router.get('/:id', getSinglePost, (req, res) => {
  res.json(res.post);
})

/* create a post */
router.post('/', async (req, res) => {
  const { body } = req;
  const post = new Post(body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
})

/* edit post - grab post with id from database */
router.get('/:id/edit', getSinglePost, (req, res) => {
  res.json(res.post);
})

/* update a post */
router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true});
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})
/* delete a post */

module.exports = router;