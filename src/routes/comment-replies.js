const express = require('express');
/* preserve req.params values from the parent router by passing options(margeParams) */
const router = express.Router({ mergeParams: true });

/* Relative imports */
const { getSinglePost, getSingleComment } = require('../middlewares/posts');
const { getCommentReplies, getCommentReply, postReply, editReply } = require('../controllers/comment-replies-controller');

/* Get all replies to a comment */
router.get('/', getSinglePost, getSingleComment, getCommentReplies );

/* Get a reply to a comment */
router.get('/:reply_id', getSinglePost, getSingleComment, getCommentReply);

/* Post a reply to a comment */
router.post('/', getSinglePost, getSingleComment, postReply);

/* Edit a reply to a comment */
router.put('/:reply_id', getSinglePost, getSingleComment, editReply);

module.exports = router;