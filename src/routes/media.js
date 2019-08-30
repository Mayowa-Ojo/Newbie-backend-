const express = require('express');
const router = express.Router();
/** Relative imports */
const { 
  createMedia, 
  getMedia, 
  deleteMedia 
} = require('../controllers/media-controller');

router.get('/:id', getMedia);

router.post('/', createMedia);

router.delete('/:id', deleteMedia);

module.exports = router;