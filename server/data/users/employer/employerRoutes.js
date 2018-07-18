const express = require('express');
const passportLocal = require('passport-local');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../../../config');

const strat = require('./passport');

const Employer = require('./employerModel');

const router = express.Router();

// serialize/deserialize employers for passport
passport.serializeUser((employer, done) => {
  done(null, employer._id);
});
passport.deserializeUser((employerId, done) => {
  Employer.findById(employerId, (err, user) => done(err, user));
});

// implement local strategy for authentication
const local = new passportLocal.Strategy((username, password, done) => {
  Employer.findOne({ username })
    .then((employer) => {
      if (!employer || !employer.authenticate(password)) {
        done(null, false, { message: 'Invalid username/password' });
      } else {
        done(null, employer);
      }
    })
    .catch(e => done(e));
});
passport.use('local', local);

router
  .get('/', (req, res) => {
    Employer.find()
      .select('-password -_id')
      .then((employers) => {
        res.status(200).json(employers);
      })
      .catch(err => res.status(500).json(err));
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

    if (
      !companyName
      || !companyUrl
      || !industry
      || !description
      || !username
      || !password
      || !email
    ) {
      res
        .status(300)
        .json({ message: "You need to think about what you're sending, bro." });
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
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: 'Something went wrong. That much I know for sure' });
      });
  })
  .post('/login', (req, res) => {
    const { username, password } = req.body;
    Employer.findOne({ username })
    // check if password matches
      .then((employer) => {
        if (!employer) {
          return res.status(400).json({ message: 'Employer record not found.' });
        }
        employer
          .authenticate(password)
          .then((authenticated) => {
            if (!authenticated) {
              return res.status(401).send({ message: 'Bad credentials.' });
            }
            const token = jwt.sign(employer.toJSON(), config.secret);
            return res.json({ success: true, token: `JWT ${token}` });
          }).catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      }).catch((err) => {
        return res.status(500).json(err);
      });
  });


// save dummy data for testing
// const dummyData = JSON.parse(fs.readFileSync('dummydata.json'));
// Employer.create(dummyData);

module.exports = router;
