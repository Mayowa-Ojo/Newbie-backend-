const express = require('express');
const router = express.Router();
const { createUser, userSignIn } = require('../controllers/user-controller');
/** Relative imports */

/** setup user routes */

/** create user route */
router.post('/register', createUser);

/** user login route */
router.post('/login', userSignIn);

module.exports = router;