const express = require('express');
const router = express.Router();
const passport  = require('passport');
/** Relative imports */
const { parser } = require('../config/media-upload');
const { 
  createMedia, 
  getMedia, 
  deleteMedia 
} = require('../controllers/media-controller');

/** global variables */
const authorizeRoute = passport.authenticate('jwt', { session: false });

router.get('/:id', getMedia);

router.post('/', authorizeRoute, parser.single('image'), createMedia);

router.delete('/:id', authorizeRoute, deleteMedia);

module.exports = router;