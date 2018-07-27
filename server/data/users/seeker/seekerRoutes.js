const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const secret = process.env.SECRET_KEY || require('../../../../config').secret;
const Seeker = require('./seekerModel');
const Job = require('../../jobs/jobModel');
const Employer = require('../employer/employerModel');

const EXPIRATION = 1000 * 60 * 60 * 12; /* hours in milliseconds */
const router = express.Router();

router
  .get('/', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      if (req.user.userType !== 'Employer') {
        res.status(401).json({ message: 'You must be logged in as an employer to browse job seekers.' });
      }
      const employerId = req.user.id;
      Employer
        .findById(employerId).populate('submittedJobs')
        .then((employer) => {
          const topSkills = [];
          employer.submittedJobs.forEach((job) => {
            job.topSkills.forEach((skill) => {
              if (topSkills.indexOf(skill) === -1) {
                topSkills.push(skill);
              }
            });
          });
          Seeker.find({ topSkills: { $in: topSkills } })
            .select('-password -likedJobs -matchedJobs -skippedJobs -email')
            .then((seekers) => {
              res.status(200).json(seekers);
            })
            .catch(err => res.status(500).json(err));
        }).catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
  .get('/unique/:email', (req, res) => {
    const { email } = req.params;
    Seeker
      .find({ email }).select('email')
      .then((seeker) => {
        if (!seeker.email) {
          res.status(200).json({ userIsUnique: true });
        } res.status(200).json({ userIsUnique: false });
      }).catch((err) => {
        res.status(200).json({ message: err.message });
      });
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
      experience,
      education,
    } = req.body;

    if (!experience || !education || !email || !firstName || !lastName || !summary || !topSkills || !password || !email) {
      res.status(300).json({ message: 'The following fields are required: experience, education, email, firstName, lastName, summary, topSkills, password, email.' });
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
      experience,
      education,
    });

    seeker
      .save()
      .then((newUser) => {
        const payload = {
          exp: Date.now() + EXPIRATION,
          sub: seeker._id,
          userType: seeker.userType,
        };
        const token = jwt.encode(payload, secret);
        return res.status(200).json({ newUser, token });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;
    Seeker.findOne({ email })
      // check if password matches
      .then((seeker) => {
        if (!seeker) {
          res.status(400).json({ message: 'Seeker record not found.' });
        }
        seeker
          .validify(password)
          .then((passwordIsValid) => {
            if (!passwordIsValid) {
              return res.status(401).send({ message: 'Bad credentials.' });
            }
            const payload = {
              exp: Date.now() + EXPIRATION,
              sub: seeker._id,
              userType: seeker.userType,
            };
            const token = jwt.encode(payload, secret);
            return res.json({ success: true, token });
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  })
  .put('/like/:seekerId', passport.authenticate('bearer'), (req, res) => {
    // TODO: Refactor asyn/await for readability?
    // read seeker information from jwt
    const { userType } = req.user;
    const { seekerId } = req.params;
    const { jobId, superLike, skip } = req.body; // job that seeker is being liked for
    // check userType before unnecessarily hitting db
    if (userType !== 'Employer') {
      res.status(400).json({ message: 'Must be logged in as employer to like a seeker.' });
    }
    // find seeker and grab liked and matched jobs
    Seeker
      .findById(seekerId)
      .then((seeker) => {
        // find job and grab liked and matched seekers
        Job
          .findById(jobId)
          .then((job) => {
            const { matchedJobs, likedJobs, skippedJobs } = seeker;
            const { matchedSeekers, likedSeekers } = job;
            const match = superLike || (likedSeekers.indexOf(seeker._id) !== -1);
            if (skip) {
              skippedJobs.push(seekerId);
            } else if (likedSeekers.indexOf(seeker._id) === -1) {
              likedSeekers.push(seeker._id);
              if (match) {
                matchedSeekers.push(seeker._id);
                matchedJobs.push(job._id);
              }
            }
            if (likedSeekers.indexOf(seeker._id) === -1) {
              likedSeekers.push(seeker._id);
            }
            // update job and seeker with new information
            job
              .save()
              .then(() => {
                seeker
                  .update({ matchedJobs, likedJobs, skippedJobs })
                  .then(() => {
                    // return whether match was found
                    res.status(200).json({ match });
                  }).catch(err => res.status(500).json({ at: 'Seeker update', message: err.message }));
              }).catch(err => res.status(500).json({ at: 'Job update', message: err.message }));
          }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
      });
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
    Seeker.findOneAndUpdate({ email: oldUser.email }, newUser).then(() => {
      res.status(200).json(newUser);
    }).catch(err => res.status(500).json({ message: err.message }));
  })

  // TODO: fix errors when password doesn't match!!! done mabes
  .put('/password', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldSeeker = req.user;
    const { oldPassword } = req.body;
    Seeker.findById(oldSeeker._id)
      .then((seeker) => {
        seeker.validify(oldPassword).then((isValid) => {
          if (!isValid) {
            res.status(403).json({ message: 'Old password invalid' });
          }
          oldSeeker.password = req.body.newPassword;
          oldSeeker.save()
            .then((user) => {
              res.status(200).json(user);
            }).catch((err) => {
              res.status(500).json(err);
              // sends back old doc bro
            });
        })
          .catch((validifyFailed) => {
            res.status(500).json(validifyFailed);
          });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  })
  .get('/:seekerId', (req, res) => {
    Seeker.findById(req.params.seekerId)
      .then((seeker) => {
        res.status(200).json(seeker);
      }).catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });

module.exports = router;
