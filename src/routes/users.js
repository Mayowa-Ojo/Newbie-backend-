const express = require('express');
const router = express.Router();
const passport = require('passport');
/** Relative imports */
const { createUser, userSignIn, getUserProfile } = require('../controllers/user-controller');

/** setup user routes */

/** create user route */
router.post('/register', passport.authenticate('register', {session: false}), createUser);

/** user login route */
router.post('/login', userSignIn);

/** get user profile */
router.get('/profile', passport.authenticate('jwt', {session: false}), getUserProfile);

module.exports = router;