/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
const express = require('express');
const passport = require('passport');
const Seeker = require('./seekerModel');
const Job = require('../../jobs/jobModel');
const Employer = require('../employer/employerModel');
const {
  decode, sign, sendMail, randomString,
} = require('../apiTools');

const appUrl = process.env.APP_URL;
const EXPIRATION = 1000 * 60 * 60 * 12; /* hours in milliseconds */
const router = express.Router();

router
  .get('/', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      if (req.user.userType !== 'employer') {
        return res.status(401).json({ message: 'You must be logged in as an employer to browse job seekers.' });
      }
      const employerId = req.user.id;
      Employer
        .findById(employerId).populate('submittedJobs')
        .then((employer) => {
          const { submittedJobs } = employer;
          const job = submittedJobs[Math.floor(Math.random() * submittedJobs.length)];
          const { topSkills, skippedSeekers, likedSeekers } = job;
          Seeker
            .findOne({
              topSkills: { $in: topSkills },
              _id: { $not: { $in: [...skippedSeekers, ...likedSeekers] } },
            }).select('-password -likedJobs -matchedJobs -skippedJobs -email')
            .then((seeker) => {
              res.status(200).json({ job, seeker });
            });
        }).catch(err => res.status(500).json({ message: err.message }));
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
    } = decode(req.body.token);

    if (!experience || !education || !email || !firstName
      || !lastName || !summary || !topSkills || !password || !email) {
      return res.status(300).json({ message: 'The following fields are required: experience, education, email, firstName, lastName, summary, topSkills, password, email.' });
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
      .then((profile) => {
        const payload = {
          exp: Date.now() + EXPIRATION,
          sub: seeker._id,
          userType: seeker.userType,
        };
        const token = sign(payload);
        return res.status(200).json({ profile, token });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = decode(req.body.token);
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
              return res.status(401).json({ message: 'Bad credentials.' });
            }
            const payload = {
              exp: Date.now() + EXPIRATION,
              sub: seeker._id,
              userType: seeker.userType,
            };
            const token = sign(payload);
            const profile = seeker;
            return res.json({ profile, token });
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  })
  .put('/like/:seekerId', passport.authenticate('bearer'), (req, res) => {
    // read data from jwt, params, and body
    const employer = req.user;
    const { userType } = req.user;
    const { seekerId } = req.params;
    const { jobId, superLike, skip } = req.body;
    // check userType before unnecessarily hitting db
    if (userType !== 'employer') {
      return res.status(400).json({ message: 'Must be logged in as employer to call a job seeker.' });
    }
    if (employer.credits < 10 && employer.callsAvailable < 1) {
      return res.status(400).json({ message: 'You do not have enough credits to call a job seeker.' });
    }
    // find seeker and grab liked and matched jobs
    Seeker
      .findById(seekerId)
      .then((seeker) => {
        // find job and grab liked and matched seekers
        Job
          .findById(jobId)
          .then((job) => {
            // grab appropriate fields from employer and job documents
            const { matchedJobs, likedJobs } = seeker;
            let { callsAvailable, credits, previousMatches } = employer;
            const { matchedSeekers, likedSeekers, skippedSeekers } = job;
            const match = superLike || (likedJobs.indexOf(jobId) !== -1);
            // if no skip, check for existing like. like and charge if like is new.
            if (skip && skippedSeekers.indexOf(seekerId === -1)) {
              skippedSeekers.push(seekerId);
            } else if (likedSeekers.indexOf(seeker._id) === -1) {
              likedSeekers.push(seeker._id);
              if (match && matchedSeekers.indexOf(seeker._id === -1)) {
                matchedSeekers.push(seeker._id);
                previousMatches.push(seeker._id);
                matchedJobs.push(job._id);
              }
              // charge for service
              if (callsAvailable > 0) {
                callsAvailable -= 1;
              } else {
                credits -= 10;
              }
            }
            // update job, seeker, and employer with new information
            job
              .save()
              .then(() => {
                seeker
                  .update({ matchedJobs })
                  .then(() => {
                    employer
                      .update({ callsAvailable, credits, previousMatches })
                      .then(() => {
                        // return changes to job and match boolean to trigger newMatch event
                        res.status(200).json({
                          callsAvailable, credits, match,
                        });
                      }).catch(err => res.status(500).json({ at: 'Employer update', message: err.message }));
                  }).catch(err => res.status(500).json({ at: 'Seeker update', message: err.message }));
              }).catch(err => res.status(500).json({ at: 'Job update', message: err.message }));
          }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
      }).catch(err => res.status(500).json({ at: 'Find seeker', message: err.message }));
  })
  .put('/archive/:seekerId', passport.authenticate('bearer'), (req, res) => {
    // read data from jwt, params, and body
    const { userType } = req.user;
    const { seekerId } = req.params;
    const { jobId, reverse } = req.body;
    // check userType before unnecessarily hitting db
    if (userType !== 'employer') {
      return res.status(400).json({ message: 'Must be logged in as employer to call a job seeker.' });
    }
    Seeker
      .findById(seekerId)
      .then(() => {
        // find job and grab matched seekers
        Job
          .findById(jobId)
          .then((job) => {
            // grab appropriate fields from employer and job documents
            let { matchedSeekers, archivedSeekers } = job;
            if (reverse) {
              archivedSeekers = archivedSeekers.filter(archivedSeeker => archivedSeeker.toString() !== seekerId);
              matchedSeekers.push(seekerId);
            } else {
              matchedSeekers = matchedSeekers.filter(archivedSeeker => archivedSeeker.toString() !== seekerId);
              archivedSeekers.push(seekerId);
            }
            job
              .update({ archivedSeekers, matchedSeekers })
              .then(() => {
                res.status(200).json({ jobId, seekerId });
              }).catch(err => res.status(500).json({ at: 'Job update', message: err.message }));
          }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
      }).catch(err => res.status(500).json({ at: 'Find seeker', message: err.message }));
  })
  .get('/archived', passport.authenticate('bearer'), (req, res) => {
    const { userType, submittedJobs } = req.user;
    if (userType !== 'employer') {
      return res.status(400).json({ message: 'Must be logged in as an employer to archive a job seeker.' });
    }
    Job.find({ _id: submittedJobs, isActive: true })
      .select('titleAndSalary').populate('archivedSeekers')
      .then((jobs) => {
        res.status(200).json(jobs);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .get('/profile', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      res.status(200).json(req.user);
    })
  .put('/profile', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldSeeker = req.user; // model that passport returns
    const buffer = Object.keys(req.body);
    const restricted = ['userType', 'matchedJobs', 'password'];
    const changes = {};
    buffer.forEach((key) => { // will check for null and restricted values
      if (!restricted.includes(key)) {
        if (req.body[key]) {
          changes[key] = req.body[key];
        }
      }
    });
    const updatedSeeker = Object.assign(oldSeeker, changes);
    updatedSeeker
      .validate()
      .then(() => {
        Seeker.findOneAndUpdate({ email: oldSeeker.email }, changes).then(() => {
          res.status(200).json(changes);
        }).catch(err => res.status(500).json({ message: err.message }));
      }).catch(err => res.status(322).json({ message: err.message }));
  })
  .put('/password', passport.authenticate('bearer', { session: false }), (req, res) => {
    const oldSeeker = req.user;
    const { oldPassword, newPassword } = decode(req.body.token);
    Seeker.findById(oldSeeker._id)
      .then((seeker) => {
        seeker.validify(oldPassword).then((isValid) => {
          if (!isValid) {
            res.status(403).json({ message: 'Old password invalid' });
          }
          oldSeeker.password = newPassword;
          oldSeeker.save()
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
    Seeker.findOne({ email })
      .then((seeker) => {
        const userWasFound = seeker !== null;
        if (!userWasFound) {
          return res.status(200).json({ userWasFound });
        }
        const resetNonce = randomString(20);
        const payload = {
          sub: seeker._id,
          exp: Date.now() + EXPIRATION,
          resetNonce,
        };
        const resetToken = sign(payload);
        const emailData = {
          to: email,
          subject: 'Rcruit password reset instructions.',
          text: `Please use the following link to reset your password: ${appUrl}/resetpass/jobseekers/${resetToken}`,
          html: `
            <p>Please use the following link to reset your password.</p>
            <p>${appUrl}/resetpass/jobseekers/${resetToken}</p>`,
        };
        sendMail(emailData)
          .then(() => {
            seeker.update({ resetNonce })
            .then(() => res.status(200).json({ userWasFound }))
            .catch(() => res.status(500).json({ message: 'Ignore that email. I goofed.'}))
          })
          .catch(() => res.status(500).json({ message: 'Failed to send email.' }));
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  })
  .put('/resetpassword', (req, res) => {
    const { newPasswordToken, resetToken } = req.body;
    const { sub, exp, resetNonce } = decode(resetToken);
    const newPassword = decode(newPasswordToken);
    Seeker.findById(sub)
      .then((seeker) => {
        if (exp < Date.now()) {
          return res.status(401)
            .json({ message: 'Unauthorized. Token has expired.' });
        }
        if (!seeker.resetNonce || seeker.resetNonce !== resetNonce) {
          return res.status(401)
            .json({ message: 'Password reset token invalid. Please try again.' });
        }
        seeker.password = newPassword;
        seeker.save()
          .then(() => {
            seeker.update({ $unset: { resetNonce: '' } })
              .then(() => {
                res.status(200).json({ passwordChangeSuccess: true });
              });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }).catch((err) => {
        res.status(500).json({ err });
      });
  });

module.exports = router;
