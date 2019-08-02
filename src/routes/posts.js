const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { getSinglePost } = require('../middlewares/posts');
const seedData = require('../public/assets/seedData');

/* setup posts routes */
/* get all posts */
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find()
//     res.json(posts);
//   } catch(err) {
//     res.status(500).json({message: err.message});
//   }
// })

/* get one post */
router.get('/:id', getSinglePost, (req, res) => {
  res.json(res.post);
})

/* create a post */
router.get('/', async (req, res) => {
  const post = new Post(seedData[0]);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
})

module.exports = router;