const express = require('express');
/* preserve req.params values from the parent router by passing options(margeParams) */
const router = express.Router({ mergeParams: true });

/* Relative imports */
const { getSinglePost } = require('../middlewares/posts');
const { getComments, postComment } = require('../controllers/comment-controller');

/* Set up comments routes */

/* Get all comments for a post */
router.get('/', getSinglePost, getComments);

/* Post a comment */
router.post('/', getSinglePost, postComment);

/* Edit a comment */

module.exports = router;