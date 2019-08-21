const express = require('express');
const router = express.Router();
/* Relative imports */
const { getSinglePost } = require('../middlewares/posts');
const { 
  getPosts, 
  getPost, 
  createPost, 
  editPost,
  deletePost, 
  updateLikes,
} = require('../controllers/post-controller');

/** setup posts routes */

/** get all posts */
router.get('/', getPosts);

/** Get one post */
router.get('/:id', getSinglePost, getPost);

/** Create a post */
router.post('/', createPost);

/** Edit a post */
router.put('/:id', editPost);

/** Delete a post */
router.delete('/:id', getSinglePost, deletePost);

/** update likes */
router.put('/:id/likes', getSinglePost, updateLikes);

module.exports = router;