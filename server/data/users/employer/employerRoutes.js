const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const secret = process.env.SECRET_KEY || require('../../../../config').secret;
const Employer = require('./employerModel');

const router = express.Router();

router
  .get('/', (req, res) => {
    Employer.find()
      .select('-password -_id')
      .then(employers => {
        res.status(200).json(employers);
      })
      .catch(err => res.status(500).json(err));
  }).get('/unique/:email', (req, res) => {
    const { email } = req.params;
    Employer
    .find({ email }).select('email')
    .then(employer => {
      if (!employer.email) {
        res.status(200).json({ userIsUnique: true });
      } res.status(200).json({ userIsUnique: false });
    }).catch(err => {
      res.status
    })
  })
  .post('/register', (req, res) => {
    const { companyName, companyUrl, industry, description, email, password } = req.body;

    if (!companyName || !companyUrl || !industry || !description || !email || !password ) {
      res.status(300).json({ message: "You need to think about what you're sending, bro." });
    }

    const employer = new Employer({
      companyName,
      companyUrl,
      industry,
      description,
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
    const { email, password } = req.body;
    Employer.findOne({ email })
      // check if password matches
      .then(employer => {
        if (!employer) {
          return res.status(400).json({ message: 'Employer record not found.' });
        }
        employer
          .validify(password)
          .then(authenticated => {
            if (!authenticated) {
              return res.status(401).send({ message: 'Bad credentials.' });
            }
            const user = {
              email: employer.email,
              userType: employer.userType,
            }
            const token = jwt.encode(user, secret);
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
