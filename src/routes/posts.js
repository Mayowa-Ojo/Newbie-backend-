const express = require('express');
const router = express.Router();
/* Relative imports */
const { getSinglePost } = require('../middlewares/posts');
const { 
  getPosts, 
  getOnePost, 
  createPost, 
  editPost, 
  deletePost, 
  updateLikes 
} = require('../controllers/post-controller');

/* setup posts routes */
/* get all posts */
router.get('/', getPosts);

/* Get one post */
router.get('/:id', getSinglePost, getOnePost);

/* Create a post */
router.post('/', createPost);

/* edit post - grab post with id from database 
router.get('/:id/edit', getSinglePost, (req, res) => {
  res.json(res.post);
})
*/

/* Edit a post */
router.put('/:id', editPost);

/* Delete a post */
router.delete('/:id', getSinglePost, deletePost);

/* update likes */
router.patch('/:id/likes', getSinglePost, updateLikes);

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