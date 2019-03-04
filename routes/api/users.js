const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// Load input validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load secretOrKey
const { secretOrKey } = require('../../config/keys');

const router = express.Router();

// @route  POST api/users/register
// @desc   Register new user
// @access Public
router.post('/register', (req, res) => {
  // Check for any input errors.
  const { errors, isValid } = validateRegisterInput(req.body);

  // Input is invalid.
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { handle, email, password } = req.body;
  // Check to make sure nobody has already registered with the email.
  User.findOne({ email }).then(user => {
    if (user) {
      // Throw a 400 error if the email address already exists.
      return res.status(400).json({
        email: 'A user has already registered with this email address.'
      });
    }
    // Otherwise create a new user.
    // Encrypt the password by hashing it.
    bcrypt.genSalt(10, (saltErr, salt) => {
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) throw hashErr;

        const newUser = new User({
          handle,
          email,
          password: hash
        });
        // Save new use to database.
        newUser
          .save()
          .then(savedUser => res.json(savedUser))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route  POST api/users/login
// @desc   Login user / Returning json web token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    // No user found.
    if (!user) {
      return res.status(404).json({ email: 'This user does not exist.' });
    }
    // User found with given email.
    // Check if passwords matches.
    bcrypt.compare(password, user.password).then(isMatch => {
      // Password is correct.
      if (isMatch) {
        const { id, handle } = user;
        // Create payload for JWT token.
        const payload = {
          id,
          handle
        };
        // Sign new JWT token.
        jwt.sign(payload, secretOrKey, { expiresIn: '2h' }, (err, token) => {
          // Send response with token.
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        // No matching passwords.
        return res.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Get current logged in user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, handle, email } = req.user;

  res.json({ id, handle, email });
});

module.exports = router;
