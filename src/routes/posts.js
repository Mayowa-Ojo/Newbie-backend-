const express = require('express');
const router = express.Router();
/* Relative imports */
const Post = require('../models/post');
const { getSinglePost } = require('../middlewares/posts');

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
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false});
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

/* delete a post */
router.delete('/:id', getSinglePost, (req, res) => {
  // const { id } = req.params;
  try {
    res.post.remove();
    res.json({message: 'successfully deleted post'});
  } catch(err) {
    res.status(500).json(err.message);
  }
})

/* update likes */
router.patch('/:id/likes', getSinglePost, async (req, res) => {
  const { id } = req.params;
  const { meta: { likes } } = res.post;
  const updatedLikes = {meta: {likes: likes + 1}}
  // res.json({updatedLikes})
  try {
    const update = await Post.findByIdAndUpdate(id, updatedLikes, {new: true, useFindAndModify: false});
    res.json(update);
  } catch(err) {
    res.status(500).json(err.message);
  }
})

/*
fetch(url, {
  method: 'patch',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err))
*/

module.exports = router;