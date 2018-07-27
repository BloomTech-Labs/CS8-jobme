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
          res.status(500).json(err);
        });
    } else if (userType === 'Seeker') {
      const { topSkills, likedJobs, skippedJobs } = req.user; // TODO: Add other skill fields
      Job
        .find({
          topSkills: { $in: topSkills },
          _id: { $not: { $in: [...likedJobs, ...skippedJobs] } },
        })
        .then((jobs) => {
          // TODO: Discuss localization of job results with team
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view jobs.' });
    }
  })
  .post('/', (req, res) => {
    const { userType } = req.user;
    const company = req.user._id;
    const {
      titleAndSalary, topSkills, additionalSkills, familiarWith, description,
    } = req.body;
    if (userType !== 'Employer') {
      res.status(400).json({ message: 'Must be logged in as an employer to post a job.' });
    } const job = new Job({
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
        res.status(500).json(err);
      });
  }).put('/like/:jobId', (req, res) => {
    // TODO: Change docs to reflect PUT vs POST
    // TODO: Refactor async/await for readability?
    // read seeker information from jwt
    const { userType } = req.user;
    const seeker = req.user;
    const { jobId } = req.params;
    // check userType before unnecessarily hitting db
    if (userType !== 'Seeker') {
      res.status(400).json({ message: 'Must be logged in as a job seeker to like a job.' });
    }
    // find job and grab liked and matched seekers
    Job
      .findById(jobId).select('likedSeekers matchedSeekers')
      .then((job) => {
        let match = false;
        const { matchedJobs, likedJobs } = seeker;
        const { matchedSeekers, likedSeekers } = job;
        console.log(likedSeekers)
        if (likedJobs.indexOf(job._id) === -1) {
          likedJobs.push(job._id);
        }
        // check job for seeker like match
        if (likedSeekers.indexOf(seeker._id) !== -1) {
          match = true;
          matchedSeekers.push(seeker._id);
          matchedJobs.push(job._id);
        }
        // update job and seeker with new information
        job
          .save()
          .then(() => {
            seeker
              .update({ matchedJobs, likedJobs })
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
