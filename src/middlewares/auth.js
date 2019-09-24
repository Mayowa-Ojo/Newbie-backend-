const passport = require('passport');
const { ExtractJwt, Strategy: JWTstrategy } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const env = require('dotenv');

/** Relative imports */
const User = require('../models/user');

env.config();
/** Global variables */
const SECRET = process.env.SECRET;

/** user signup middleware */
passport.use('register', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const { username, name } = req.body;
    const user = await User.findOne({email})
    // check if this user already exists, hence return error
    if(user) {
      return done(null, false, {message: "email is taken"});
    } else {
      // create new user
      const newUser = new User({
        name,
        username,
        email,
        password
      });
      // save user to database
      const createdUser = await newUser.save();
      // send user information to next middleware
      return done(null, createdUser);
    }
  } catch(err) {
    done(err);
  }
}));

/** user login middleware */
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({email})
    // check if this user already exists, hence return error
    if(!user) {
      return done(null, false, {message: "invalid credentials"});
    } else {
      // check if password matches
      const isvalid = await user.validatePassword(password);
      if(isvalid) {
        // pass user information to the next  middleware
        return done(null, user, {message: "user login successful"})
      } else return done(null, false, {message: "incorrect password"})
    }
  } catch(err) {
    done(err);
  }
}));

/** token authorization middleware */
passport.use(new JWTstrategy({
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
}, async (token, done) => {
  try {
    // find user with id field in token
    const user = await User.findById(token._id)
    // pass token to next middleware
    // after authorization, the user object is attached to the request object
    return done(null, user)
  } catch(err) {
    done(null, err);
  }
}));
