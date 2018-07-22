const express = require('express');
const passport = require('passport');
const Job = require('./jobModel');
const Seeker = require('../users/seeker/seekerModel');
const Employer = require('../users/employer/employerModel');

const router = express.Router();

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const { _id, userType } = req.user;
    if (userType === 'Employer') {
      Job
        .find({ company: _id })
        .then((jobs) => {
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json(err);
        });
    } else if (userType === 'Seeker') {
      const { topSkills } = req.user; // TODO: Add other skill fields
      Job
        .find({ topSkills: { $in: topSkills } })
        .then((jobs) => {
          // localJobs = jobs.filter(job => {
          //     return job.location === seeker.location
          // }) // TODO: Discuss localization with team
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
          }).catch(() => {
            res.status(500).json({ message: 'Failed to find and update employer.' });
          });
      }).catch((err) => {
        res.status(500).json(err);
      });
  }).put('/like/:jobId', (req, res) => {
    // TODO: Change docs to reflect PUT vs POST
    // TODO: Refactor async/await for readability?
    // read seeker information from jwt
    const { userType } = req.user;
    const seekerId = req.user._id;
    const { jobId } = req.params;
    // check userType before unnecessarily hitting db
    if (userType !== 'Seeker') {
      res.status(400).json({ message: 'Must be logged in as a job seeker to like a job1.' });
    }
    // find job and grab liked and matchd seekers
    Job
      .findById(jobId)
      .then((job) => {
        const { likedSeekers } = job;
        // find seeker and grab liked and matched jobs
        Seeker
          .findById(seekerId)
          .then((seeker) => {
            let match = false;
            let matchedJobs;
            let matchedSeekers;
            // check job for seeker like match
            if (likedSeekers.indexOf(seekerId) !== -1) {
              match = true;
              matchedSeekers = seekerId;
              matchedJobs = jobId;
            }
            // update job and seeker with new information
            job
              .update({ $addToSet: { matchedSeekers } })
              .then(() => {
                seeker
                  .update({ $addToSet: { likedJobs: jobId, matchedJobs } })
                  .then(() => {
                    // return whether match was found
                    res.status(200).json({ match });
                  }).catch(() => res.status(500).json({ message: 'Failed to update seeker.' }));
              }).catch(() => res.status(500).json({ message: 'Failed to update job.' }));
          }).catch(() => res.status(500).json({ message: 'Failed to find seeker.' }));
      }).catch(() => res.status(500).json({ message: 'Failed to find job.' }));
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
        .catch(() => {
          res.status(500).json({ message: 'Failed to find jobs.' });
        });
    // Seekers receive an array of jobs that they have matched for
    } else if (userType === 'Seeker') {
      const seekerId = req.user._id;
      Job.find({ matchedSeekers: seekerId }).select('-matchedSeekers -likedSeekers')
        .then((jobs) => {
          res.status(200).json(jobs);
        }).catch(() => {
          res.status(500).json({ message: 'Faild to find jobs.' });
        });
    } else {
      res.status(400).json({ message: 'Must be logged in as either seeker or employer to get matches.' });
    }
  })
  // standard get on a specific jobId for debugging
  // TODO: Remove from production to reduce web-scraper api abuse?
  // (objectId assdignment is predictably incremented)
  .get('/:jobId', (req, res) => {
    Job.findById(req.params.jobId)
      .then((job) => {
        res.status(200).json(job);
      }).catch(() => {
        res.status(500).json({ message: 'Failed to retrieve job.' });
      });
  });

module.exports = router;
