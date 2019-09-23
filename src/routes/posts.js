const express = require('express');
const router = express.Router();
const passport = require('passport');

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

/** Global variables */
const authorizeRoute = passport.authenticate('jwt', {session: false});

/** setup posts routes */

/** get all posts */
router.get('/', getPosts);

/** Get one post */
router.get('/:id', getSinglePost, getPost);

/** Create a post */
router.post('/', authorizeRoute, createPost);

/** Edit a post */
router.put('/:id', authorizeRoute, editPost);

/** Delete a post */
router.delete('/:id', authorizeRoute, getSinglePost, deletePost);

/** update likes */
router.put('/:id/likes', getSinglePost, updateLikes);

module.exports = router;