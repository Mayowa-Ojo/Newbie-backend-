const express = require('express');
/* preserve req.params values from the parent router by passing options(margeParams) */
const router = express.Router({ mergeParams: true });

/* Relative imports */
const { getSinglePost, getSingleComment } = require('../middlewares/posts');
const { 
  getComments, 
  getOneComment, 
  postComment, 
  editComment, 
  deleteComment 
} = require('../controllers/comment-controller');

/* Set up comments routes */

/* Get all comments for a post */
router.get('/', getSinglePost, getComments);

/* Get a single comment */
router.get('/:comment_id', getSinglePost, getSingleComment, getOneComment);

/* Post a comment */
router.post('/', getSinglePost, postComment);

/* Edit a comment */
router.put('/:comment_id', getSinglePost, editComment);

/* Delete a comment */
router.delete('/:comment_id', getSinglePost, deleteComment);

module.exports = router;