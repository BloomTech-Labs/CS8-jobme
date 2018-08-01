const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;
const Employer = require('./employerModel');

const EXPIRATION = 1000 * 60 * 60 * 12; /* hours in milliseconds */
const router = express.Router();

router
  .get('/', (req, res) => {
    Employer.find()
      .select('-password -_id')
      .then((employers) => {
        res.status(200).json(employers);
      })
      .catch(err => res.status(500).json(err));
  }).get('/unique/:email', (req, res) => {
    const { email } = req.params;
    Employer
      .find({ email }).select('email')
      .then((employer) => {
        if (!employer.email) {
          res.status(200).json({ userIsUnique: true });
        } res.status(200).json({ userIsUnique: false });
      }).catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .post('/register', (req, res) => {
    const {
      companyName, companyUrl, industry, description, email, password,
    } = req.body;

    if (!companyName || !companyUrl || !industry || !description || !email || !password) {
      return res.status(300).json({ message: "You need to think about what you're sending, bro." });
    }

    const employer = new Employer({
      companyName,
      companyUrl,
      industry,
      description,
      password,
      email,
    });

    employer
      .save()
      .then((profile) => {
        const payload = {
          exp: Date.now() + EXPIRATION,
          sub: employer._id,
          userType: employer.userType,
        };
        const token = jwt.sign(payload, secret);
        res.status(200).json({ profile, token });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;
    Employer.findOne({ email })
      // check if password matches
      .then((employer) => {
        if (!employer) {
          res.status(404).json({ message: 'Employer not found.' });
        }
        employer
          .validify(password)
          .then((passwordIsValid) => {
            if (!passwordIsValid) {
              res.status(401).send({ error: 'Bad credentials.' });
            }
            const payload = {
              exp: Date.now() + EXPIRATION,
              sub: employer._id,
              userType: employer.userType,
            };
            const token = jwt.encode(payload, secret);
            const profile = employer;
            res.json({ profile, token });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      })
      .catch(err => res.status(500).json(err));
  })
  .get('/profile', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      res.status(200).json(req.user);
    })
  .put('/profile', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldUser = req.user; // model that passport returns
    const buffer = Object.keys(req.body);
    const restricted = ['userType', 'submittedJobs'];
    const newUser = {};
    buffer.forEach((key) => { // will check for null and restricted values
      if (!restricted.includes(key)) {
        if (req.body[key]) {
          newUser[key] = req.body[key];
        }
      }
    });
    Employer.findOneAndUpdate({ email: oldUser.email }, newUser).then((user) => {
      res.status(200).json(user);
    }).catch(err => res.status(500).json(err));
  })

  // TODO: fix errors when password doesnt match
  .put('/password', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldEmployer = req.user;
    const { oldPassword } = req.body;
    Employer.findById(oldEmployer._id)
      .then((employer) => {
        employer.validify(oldPassword).then((isValid) => {
          if (!isValid) {
            res.status(403).json({ message: 'Old password invalid' });
          }
          oldEmployer.password = req.body.newPassword;
          oldEmployer.save()
            .then((user) => {
              res.status(200).json(user);
            }).catch((err) => {
              res.status(500).json({ message: err.message });
            // sends back old doc bro
            });
        })
          .catch(() => {
            res.status(500).json({ message: 'Failed to validate password. It\'s not your fault.' });
          });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  });
module.exports = router;
