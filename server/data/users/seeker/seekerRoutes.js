const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const secret = process.env.SECRET_KEY || require('../../../../config').secret;
const Seeker = require('./seekerModel');

const router = express.Router();

router
  .get('/', (req, res) => {
    Seeker.find()
      .select('-password -_id')
      .then(seekers => {
        res.status(200).json(seekers);
      })
      .catch(err => res.status(500).json(err));
  })
  .get('/unique/:email', (req, res) => {
    const { email } = req.params;
    Seeker
    .find({ email }).select('email')
    .then(seeker => {
      if (!seeker.email) {
        res.status(200).json({ userIsUnique: true });
      } res.status(200).json({ userIsUnique: false });
    }).catch(err => {
      res.status
    })
  })
  .post('/register', (req, res) => {
    const {
      email,
      firstName,
      lastName,
      desiredTitle,
      summary,
      topSkills,
      additionalSkills,
      familiarWith,
      password,
    } = req.body;

    if (!email || !firstName || !lastName || !summary || !topSkills || !password || !email) {
      res.status(300).json({ message: "You need to think about what you're sending, bro." });
    }

    const seeker = new Seeker({
      email,
      firstName,
      lastName,
      desiredTitle,
      summary,
      topSkills,
      additionalSkills,
      familiarWith,
      password,
    });

    seeker
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
    const { email, password } = req.body;
    Seeker.findOne({ email })
      // check if password matches
      .then(seeker => {
        if (!seeker) {
          return res.status(400).json({ message: 'Seeker record not found.' });
        }
        seeker
          .validify(password)
          .then(authenticated => {
            if (!authenticated) {
              return res.status(401).send({ message: 'Bad credentials.' });
            }
            const token = jwt.encode(seeker.toJSON(), secret);
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
  .get('/profile', passport.authenticate('bearer', { session: false })
  , (req, res) => {
    res.status(200).json(req.user);
  });

module.exports = router;
