const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { getSinglePost } = require('../middlewares/posts')

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

module.exports = router;