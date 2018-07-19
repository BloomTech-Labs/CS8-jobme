const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const jwt = require('jwt-simple');
const BearerStrategy = require('passport-http-bearer').Strategy;
const secret = process.env.SECRET_KEY || require('../../../../config').secret;
const Employer = require('./employerModel');

const router = express.Router();

// serialize/deserialize employers for passport
passport.serializeUser((employer, done) => {
  done(null, employer._id);
});
passport.deserializeUser((employerId, done) => {
  Employer.findById(employerId, (err, user) => done(err, user));
});

//strategy for handling requests for restricted endpoints
//checks for JWT on Bearer token in Auth headers
passport.use(
  new BearerStrategy((token, done) => {
    const { username } = jwt.decode(token, secret);
    Employer.findOne({ username })
      .select('-password')
      .then(employer => {
        console.log(employer);
        if (!employer) {
          return done(null, false);
        }
        return done(null, employer);
      })
      .catch(err => {
        return done(null, false);
      });
  })
);

// implement local strategy for authentication
// checks password using method on employer schema
const local = new LocalStrategy((username, password, done) => {
  Employer.findOne({ username })
    .then(employer => {
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
      .then(employers => {
        res.status(200).json(employers);
      })
      .catch(err => res.status(500).json(err));
  })
  .post('/register', (req, res) => {
    const { companyName, companyUrl, industry, description, username, password, email } = req.body;

    if (!companyName || !companyUrl || !industry || !description || !username || !password || !email) {
      res.status(300).json({ message: "You need to think about what you're sending, bro." });
    }

    const employer = new Employer({
      companyName,
      companyUrl,
      industry,
      description,
      username,
      password,
      email
    });

    employer
      .save()
      .then(newUser => {
        res.status(200).json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong. That much I know for sure' });
      });
  })
  .post('/login', (req, res) => {
    const { username, password } = req.body;
    Employer.findOne({ username })
      // check if password matches
      .then(employer => {
        if (!employer) {
          return res.status(400).json({ message: 'Employer record not found.' });
        }
        employer
          .authenticate(password)
          .then(authenticated => {
            if (!authenticated) {
              return res.status(401).send({ message: 'Bad credentials.' });
            }
            const token = jwt.encode(employer.toJSON(), secret);
            return res.json({ success: true, token });
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  })
  .get('/profile', passport.authenticate('bearer', { session: false }), (req, res) => {
    res.status(200).json(req.user);
  });

module.exports = router;
