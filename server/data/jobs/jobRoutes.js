/* eslint prefer-const: 0 */
const express = require('express');
const passport = require('passport');
const Job = require('./jobModel');
const Employer = require('../users/employer/employerModel');

const router = express.Router();

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const { userType } = req.user;
    if (userType === 'Employer') {
      const employerId = req.user._id;
      Job
        .find({ company: employerId })
        .then((jobs) => {
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else if (userType === 'Seeker') {
      const { topSkills, likedJobs, skippedJobs } = req.user; // TODO: Add other skill fields
      Job
        .find({
          topSkills: { $in: topSkills },
          _id: { $not: { $in: [...likedJobs, ...skippedJobs] } },
        }).populate({ path: 'company', select: 'companyName description' })
        .then((jobs) => {
          // TODO: Discuss localization of job results with team
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      return res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view jobs.' });
    }
  })
  .post('/', (req, res) => {
    const { userType, postsAvailable } = req.user;
    const company = req.user._id;
    const {
      titleAndSalary, topSkills, additionalSkills, familiarWith, description,
    } = req.body;
    if (userType !== 'Employer') {
      return res.status(400).json({ message: 'Must be logged in as an employer to post a job.' });
    } if (!postsAvailable) {
      return res.status(400).json({ message: "You don't have any posts available. Please purchase some." });
    }
    const job = new Job({
      company,
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
    });
    job
      .save()
      .then((newJob) => {
        Employer.findByIdAndUpdate(company, { $addToSet: { submittedJobs: newJob._id } })
          .then(() => {
            res.status(200).json(newJob);
          }).catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }).catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }).put('/like/:jobId', (req, res) => {
    // TODO: Refactor async/await for readability?
    // read seeker information from jwt
    const { userType } = req.user;
    const seeker = req.user;
    const { jobId } = req.params;
    const { superLike, skip } = req.body;
    // check userType before unnecessarily hitting db
    if (userType !== 'Seeker') {
      return res.status(400).json({ message: 'Must be logged in as a job seeker to app a job.' });
    }
    if (seeker.credits < 10 && seeker.appsAvailable < 1) {
      return res.status(400).json({ message: 'You do not have enough credits to app a job.' });
    }
    Job
      .findById(jobId).select('likedSeekers matchedSeekers')
      .then((job) => {
        // grab all variables from seeker and job documents
        let {
          matchedJobs, likedJobs, skippedJobs, appsAvailable, credits,
        } = seeker;
        const { matchedSeekers, likedSeekers } = job;
        const match = superLike || (likedSeekers.indexOf(seeker._id) !== -1);
        // charge for service (update laste after all other actions)
        if (appsAvailable > 0) {
          appsAvailable -= 1;
        } else {
          credits -= 10;
        }
        if (match) {
          matchedSeekers.push(seeker._id);
          matchedJobs.push(job._id);
        } if (skip) {
          skippedJobs.push(jobId);
        } else if (likedJobs.indexOf(jobId)) {
          likedJobs.push(jobId);
        }
        // update job and seeker with new information
        job
          .save()
          .then(() => {
            seeker
              .update({
                matchedJobs, likedJobs, skippedJobs, appsAvailable, credits,
              })
              .then(() => {
                // return whether match was found
                res.status(200).json({ match });
              }).catch(err => res.status(500).json({ at: 'Seeker update', message: err.message }));
          }).catch(err => res.status(500).json({ at: 'Job update', message: err.message }));
      }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
  })
  .put('/super/:jobId', (req, res) => {
    res.status(200).json({ user: req.user });
  })
  .get('/matches', (req, res) => {
    const { userType } = req.user;
    // Employers receive an array of their jobs with all matched seekers
    if (userType === 'Employer') {
      const { submittedJobs } = req.user;
      Job.find({ _id: submittedJobs }).select('titleAndSalary').populate('matchedSeekers')
        .then((jobs) => {
          res.status(200).json(jobs);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    // Seekers receive an array of jobs that they have matched for
    } else if (userType === 'Seeker') {
      const seekerId = req.user._id;
      Job.find({ matchedSeekers: seekerId }).select('-matchedSeekers -likedSeekers')
        .then((jobs) => {
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(500).json({ message: 'Some thing went wrong when we tried to find jobs.' });
    }
  })
  // standard get on a specific jobId for debugging
  // TODO: Remove from production to reduce web-scraper api abuse?
  // (objectId assdignment is predictably incremented)
  .get('/:jobId', (req, res) => {
    Job.findById(req.params.jobId)
      .then((job) => {
        res.status(200).json(job);
      }).catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });

module.exports = router;
