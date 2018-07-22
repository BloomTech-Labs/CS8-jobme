const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const secret = process.env.SECRET_KEY || require('../../../../config').secret;
const Seeker = require('./seekerModel');
const Job = require('../../jobs/jobModel');

const router = express.Router();

router
  .get('/', (req, res) => {
    Seeker.find()
      .select('-password')
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
            const user = {
              email: seeker.email,
              userType: seeker.userType,
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
  }).put('/like/:seekerId', passport.authenticate('bearer'), (req, res) => {
    // TODO: Refactor asyn/await for readability?
    // read seeker information from jwt
    const { userType } = req.user;
    const employerId = req.user._id;
    const { seekerId } = req.params;
    const { jobId } = req.body; // job that seeker is being liked for
    // check userType before unnecessarily hitting db
    if (userType !== "Employer") {
        res.status(400).json({ message: "Must be logged in as employer to like a seeker." })
    }
    // find seeker and grab liked and matched jobs
    Seeker
        .findById(seekerId)
        .then(seeker => {
            const { likedJobs, matchedJobs } = seeker;
            // find job and grab liked and matched seekers
            Job
                .findById( jobId )
                .then(job => {
                    const { company, likedSeekers, matchedSeekers } = job;
                    let match = false;
                    // if (company !== employerId) {
                    //   res.status(400).json({ message: "Employer is not authorized to like for this job." });
                    // }
                    // add seeker to liked seekers if unique
                    if (!likedSeekers.includes(seekerId)) {
                        likedSeekers.push(seekerId);
                    }
                    // check job for seeker like match
                    // TODO: MAKE THIS ACTUALLY WORK
                    if (likedJobs.includes(jobId)) {
                        match = true;
                        matchedSeekers.push(seekerId);
                        matchedJobs.push(jobId);
                    }
                    // update job and seeker with new information
                    job
                        .update({ likedSeekers, matchedSeekers })
                        .then(() => {
                            seeker
                                .update({ matchedJobs })
                                .then(() => {
                                    // return whether match was found
                                    res.status(200).json({ match });
                                }).catch(err => res.status(500).json({ message: "Failed to update seeker."}))
                        }).catch(err => res.status(500).json({ message: "Failed to update job."}));
                }).catch(err => res.status(500).json({ message: "Failed to find seeker."}));
        }).catch(err => res.status(500).json({ message: "Failed to find job." }));
  })
  .get('/profile', passport.authenticate('bearer', { session: false })
  , (req, res) => {
    res.status(200).json(req.user);
  })
  .get('/:seekerId', (req, res) => {
    Seeker.findById(req.params.seekerId)
    .then(seeker => {
      res.status(200).json(seeker);
    }).catch(err =>{
      res.status(500).json({ message: "Failed to retrieve seeker." })
    })
  })

module.exports = router;
