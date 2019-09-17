const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
/** Relative imports */
const User = require('../models/user');

env.config();
/** Global variables */
const SECRET = process.env.SECRET;

/**
 *  create user
 *  expects a post request from the client with payload like so: { name, email, username, password, confirmPassword }
 *  end-point: "/api/users/register"
 */
exports.createUser = async (req, res) => {
  try {
    const { email, name, username, password, confirmPassword } = req.body;
    const user = await User.findOne({email})
    // check if this user already exists, hence return error
    if(user) {
      return res.status(400).json({message: "email is taken"});
    } else {
      // compare the two passwords
      if(password != confirmPassword) {
        return res.status(400).json({message: "passwords do not match"})
      } else {
        // generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const newUser = new User({
          name,
          email,
          username,
          password: hashedPassword,
        })
        // save user to database
        const createdUser = await newUser.save();
        // return user to client
        res.status(201).json(createdUser);
      }
    }
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/**
 *  user login
 *  expects a post request fro the client wiht payload like so: { email/username, password }
 *  end-point: "/api/users/login"
 */
exports.userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // get user from database
    const user = await User.findOne({ email });
    // check if user exists
    if(!user) {
      return res.status(400).json({message: "invalid credentials"});
    }
    // check if password matches
    if(await bcrypt.compare(password, user.password)) {
      const { id, username } = user;
      const payload = {
        id,
        username
      }
      // create a token 
      jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
        // check for error
        if(err) {
          res.status(500).json({message: err.message});
        }
        res.json({
          success: true,
          token: `Bearer ${token}`
        });
      });
    } else return res.status(400).json({message: "incorrect password"});
    
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = exports;