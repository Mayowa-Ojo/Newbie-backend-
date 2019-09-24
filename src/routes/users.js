const express = require('express');
const router = express.Router();
const passport = require('passport');
/** Relative imports */
const { createUser, userSignIn, getUserProfile } = require('../controllers/user-controller');

/** Global variables */
const authorizeRoute = passport.authenticate('jwt', {session: false});

/** setup user routes */

/** create user route */
router.post('/register', createUser);

/** user login route */
router.post('/login', userSignIn);

/** get user profile */
router.get('/profile', authorizeRoute, getUserProfile);

module.exports = router;