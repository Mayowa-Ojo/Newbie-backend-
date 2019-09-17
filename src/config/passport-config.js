const { ExtractJwt, Strategy } = require('passport-jwt');
const env = require('dotenv');
const User = require('../models/user');

/** Global variables */
env.config();
const SECRET = process.env.SECRET;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  secretOrKey: SECRET
}

const passportConfig = (passport) => {
  passport.use(
    // define new strategy and extract id from payload
    new Strategy(options, async (payload, done) => {
      try {
        // query database for user
        const user = await User.findById(payload.id);
        const { id, name, email } = user;
        // check if user exists
        if(user) {
          // return user object
          return done(null, {
            id,
            name,
            email
          });
        } else return done(null, false) // user doesn't exist, return false
      } catch(err) {
        // handle potential error
        res.status(500).json({message: err.message});
      }
    })
  );
}

module.exports = passportConfig;
