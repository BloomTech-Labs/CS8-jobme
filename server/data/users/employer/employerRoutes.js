const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Employer = require('./employerModel');

const router = express.Router();

// authentication middelware
// local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  ((email, password, cb) => Employer.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, user, { message: 'Logged In Successfully' });
    })
    .catch(err => cb(err))
  )));

router
  .get('/', (req, res) => {
    Employer
      .find().select('-password -_id')
      .then((employers) => {
        res.status(200).json(employers);
      }).catch(err => res.status(500).json(err));
  })
  .post('/register', (req, res) => {
    const {
      companyName,
      companyUrl,
      industry,
      description,
      username,
      password,
      email,
    } = req.body;

    if (!companyName || !companyUrl || !industry
      || !description || !username || !password || !email) {
      res.status(300).json({ message: "You need to think about what you're sending, bro." });
    }

    const employer = new Employer({
      companyName,
      companyUrl,
      industry,
      description,
      username,
      password,
      email,
    });

    employer
      .save()
      .then((newUser) => {
        res.status(200).json(newUser);
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong. That much I know for sure' });
      });
  }).post('/login', (req, res) => {
    // grab credentials and check if either a username or an email address is present before querying db at all
    const { email, username, password } = req.body;
    if (!email && !username) {
      res.status(300).json({ message: 'Login request must have either a username or a password. Please try again.' });
      // check database for user by that name or email
    } else {
      Employer.findOne().or([{ email }, { username }])
        .then(employer => employer
          .authenticate(password) // method on the employer schema
          .then((isAuthenticated) => {
            if (isAuthenticated) {
              res.status(200).json(employer);
            } else {
              res.status(300).json({ message: 'You done goofed.' });
            }
          })).catch((err) => {
          console.log(err);
          res.status(500).json({ error: 'Something went wrong. That much I know for sure' });
        });
    }
  });

module.exports = router;
