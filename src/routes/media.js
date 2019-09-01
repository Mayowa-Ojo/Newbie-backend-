const express = require('express');
const router = express.Router();

/** Relative imports */
const { parser } = require('../config/media-upload');
const { 
  createMedia, 
  getMedia, 
  deleteMedia 
} = require('../controllers/media-controller');

router.get('/:id', getMedia);

router.post('/', parser.single('image'), createMedia);

router.delete('/:id', deleteMedia);

module.exports = router;