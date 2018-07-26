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
      const topSkills = [];
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
            .select('-password -likedJobs -matchedJobs -email')
            .then((seekers) => {
              res.status(200).json(seekers);
            })
            .catch(err => res.status(500).json(err));
        }).catch(() => {
          res.status(500).json({ message: 'Failed to find seekers.' });
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
        res.status;
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
      .then((newUser) => {
        res.status(200).json(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong. That much I know for sure' });
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;
    Seeker.findOne({ email })
      // check if password matches
      .then((seeker) => {
        if (!seeker) {
          return res.status(400).json({ message: 'Seeker record not found.' });
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
    const employerId = req.user._id;
    const { seekerId } = req.params;
    const { jobId } = req.body; // job that seeker is being liked for
    // check userType before unnecessarily hitting db
    if (userType !== 'Employer') {
      res.status(400).json({ message: 'Must be logged in as employer to like a seeker.' });
    }
    // find seeker and grab liked and matched jobs
    Seeker
      .findById(seekerId)
      .then((seeker) => {
        const { likedJobs } = seeker;
        // find job and grab liked and matched seekers
        Job
          .findById(jobId)
          .then((job) => {
            const { company } = job;
            let match = false;
            let matchedSeekers;
            let matchedJobs;
            // make sure that employer is the job poster
            if (employerId.toString() !== company.toString()) {
              res.status(400).json({ employerId, company });
            }
            // check job for seeker like match
            // Array.prototype.contains not working
            if (likedJobs.indexOf(jobId) !== -1) {
              match = true;
              matchedSeekers = seekerId;
              matchedJobs = jobId;
            }
            // update job and seeker with new information
            job
              .update({ $addToSet: { likedSeekers: seekerId, matchedSeekers } })
              .then(() => {
                seeker
                  .update({ $addToSet: { matchedJobs } })
                  .then(() => {
                    // return whether match was found
                    res.status(200).json({ match });
                  }).catch(() => res.status(500).json({ message: 'Failed to update seeker.' }));
              }).catch(() => res.status(500).json({ message: 'Failed to update job.' }));
          }).catch(() => res.status(500).json({ message: 'Failed to find seeker.' }));
      }).catch(() => res.status(500).json({ message: 'Failed to find job.' }));
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
    Seeker.findOneAndUpdate({ email: oldUser.email }, newUser).then((user) => {
      res.status(200).json(newUser);
    }).catch(err => res.status(500).json(err),
      // sends back changes only
    );
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
      }).catch(() => {
        res.status(500).json({ message: 'Failed to retrieve seeker.' });
      });
  });

module.exports = router;
