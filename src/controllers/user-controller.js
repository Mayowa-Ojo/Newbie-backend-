const passport = require('passport');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();
/** Global variables */
const SECRET = process.env.SECRET;

/**
 *  create user
 *  expects a post request from the client with payload like so: { name, email, username, password }
 *  end-point: "/api/users/register"
 */
exports.createUser = async (req, res) => {
  res.status(201).json({
    message: "sign up successful",
    user: req.user
  })
}

/**
 *  user login
 *  expects a post request fro the client wiht payload like so: { email/username, password }
 *  end-point: "/api/users/login"
 */
exports.userSignIn = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      // check if user exists
      if(err || !user) {
        const error = new Error('An error occured');
        return next(error)
      }
      // login user
      req.login(user, {session: false}, async (err) => {
        if(err) return next(err);
        // generate and sign token with email and id
        const { _id, email, name, username } = user;
        const payload = { _id, email }
        jwt.sign(payload, SECRET, { expiresIn: 10800 }, (err, token) => {
          // check for error
          if(err) {
            return next(err);
          }
          // send token to the client
          return res.json({
            message: 'user login successful',
            token: `JWT ${token}`,
            user: {id: _id, name, username, email}
          });
        });
      });  
    } catch(err) {
      return next(err);
    }
  })(req, res, next)
}

/**
 *  get user profile
 *  expects a get request from the client with the signed token in authorization header
 *    i.e: { headers: { Authorization: <insert token here> }}
 *  end-point: "/api/users/profile"
 */
exports.getUserProfile = async (req, res) => {
  res.status(201).json(req.user);
}
 
module.exports = exports;