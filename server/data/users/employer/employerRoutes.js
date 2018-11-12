/* eslint consistent-return: 0 */
const express = require('express');
const passport = require('passport');
const Employer = require('./employerModel');
const { decode, sign, sendMail, randomString } = require('../apiTools');

const EXPIRATION = 1000 * 60 * 60 * 12; /* hours in milliseconds */
const router = express.Router();

router
  .post('/register', (req, res) => {
    const {
      companyName, companyUrl, industry, description, email, password,
    } = decode(req.body.token);

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
        const token = sign(payload);
        res.status(200).json({ profile, token });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = decode(req.body.token);
    Employer.findOne({ email })
      // check if password matches
      .then((employer) => {
        if (!employer) {
          return res.status(404).json({ message: 'Employer not found.' });
        }
        employer
          .validify(password)
          .then((passwordIsValid) => {
            if (!passwordIsValid) {
              return res.status(401).json({ message: 'Bad credentials.' });
            }
            const payload = {
              exp: Date.now() + EXPIRATION,
              sub: employer._id,
              userType: employer.userType,
            };
            const token = sign(payload);
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
    const oldEmployer = req.user; // model that passport returns
    const buffer = Object.keys(req.body);
    const restricted = ['userType', 'submittedJobs', '_id', 'credits', 'callsAvailable'];
    const updates = {};
    buffer.forEach((key) => { // will check for null and restricted values
      if (!restricted.includes(key)) {
        if (req.body[key]) {
          updates[key] = req.body[key];
        }
      }
    });
    // create updated employer, then validate (without calling pre-save password hash)
    const updatedEmployer = Object.assign(oldEmployer, updates);
    updatedEmployer
      .validate()
      .then(() => {
        Employer
          .findByIdAndUpdate(oldEmployer._id, updates).then((user) => {
            res.status(200).json(user);
          }).catch(err => res.status(500).json(err));
      }).catch(err => res.status(322).json({ message: err.message }));
  })
  .put('/password', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldEmployer = req.user;
    const { oldPassword, newPassword } = decode(req.body.token);
    // pull up employer (validify method not on req.user)
    Employer.findById(oldEmployer._id)
      .then((employer) => {
        employer.validify(oldPassword).then((isValid) => {
          if (!isValid) {
            res.status(403).json({ message: 'Old password invalid' });
          }
          oldEmployer.password = newPassword;
          oldEmployer.save()
            .then((user) => {
              res.status(200).json(user);
            }).catch((err) => {
              res.status(500).json({ message: err.message });
            });
        })
          .catch(() => {
            res.status(500).json({ message: 'Failed to validate password. It\'s not your fault.' });
          });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  })
  .post('/forgotpassword', (req, res) => {
    const { email } = req.body;
    Employer.findOne({ email })
      .then((employer) => {
        const userWasFound = employer !== null;
        if (!userWasFound) {
          return res.status(200).json({ userWasFound });
        }
        const resetToken = randomString(40);
        const emailData = {
          to: email,
          subject: 'Rcruit password reset instructions.',
          text: `Please use the following link to reset your password: https://rcruit.app/resetpass/${resetToken}`,
          html: `
            <p>Please use the following link to reset your password.</p>
            <p> https://rcruit.app/resetpass/${resetToken}</p>`,
        };
        sendMail(emailData)
          .then(() => res.status(200).json({ userWasFound }))
          .catch(() => res.status(500).json({ message: 'Failed to send email.' }));
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  });
module.exports = router;
