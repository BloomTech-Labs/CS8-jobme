/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
const express = require('express');
const passport = require('passport');
const Job = require('./jobModel');

const router = express.Router();

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const { userType } = req.user;
    if (userType === 'employer') {
      const employerId = req.user._id;
      Job
        .find({ company: employerId })
        .then((jobs) => {
          res.status(200).json(jobs);
        }).catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else if (userType === 'seeker') {
      const { topSkills, likedJobs, skippedJobs } = req.user; // TODO: Add other skill fields
      Job
        .find({
          topSkills: { $in: topSkills },
          _id: {
            $not: { $in: [...likedJobs, ...skippedJobs] },
          },
          isActive: true,
        })
        .populate({ path: 'company', select: 'companyName description' })
        .then((jobs) => {
          // TODO: Discuss localization of job results with team
          res.status(200).json(jobs);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      return res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view jobs.' });
    }
  })
  .post('/', (req, res) => {
    let { userType, postsAvailable } = req.user;
    const company = req.user._id;
    const employer = req.user;
    const {
      titleAndSalary, topSkills, additionalSkills, familiarWith, description,
    } = req.body;
    if (userType !== 'employer') {
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
    postsAvailable -= 1;
    job
      .save()
      .then((newJob) => {
        employer.update({ $addToSet: { submittedJobs: newJob._id }, postsAvailable })
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
    // read information from jwt, params, and body
    const seeker = req.user;
    const { userType } = req.user;
    const { jobId } = req.params;
    const { superLike, skip } = req.body;
    // check userType before unnecessarily hitting db
    if (userType !== 'seeker') {
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
        // charge for service (update last after all other actions)
        if (skip) {
          if (skippedJobs.indexOf(jobId) === -1) {
            skippedJobs.push(jobId);
          }
        } else if (likedJobs.indexOf(jobId) === -1) {
          likedJobs.push(jobId);
          if (match && matchedJobs.indexOf(jobId) === -1) {
            matchedSeekers.push(seeker._id);
            matchedJobs.push(jobId);
          }
          if (appsAvailable > 0) {
            appsAvailable -= 1;
          } else {
            credits -= 10;
          }
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
                // return changes and match boolean for newMatch event
                res.status(200).json({
                  appsAvailable, credits, match, employerId: job.company,
                });
              }).catch(err => res.status(500).json({ at: 'Seeker update', message: err.message }));
          }).catch(err => res.status(500).json({ at: 'Job update', message: err.message }));
      }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
  })
  .get('/matches', (req, res) => {
    const { userType } = req.user;
    // Employers receive an array of their jobs with all matched seekers
    if (userType === 'employer') {
      const { submittedJobs } = req.user;
      Job.find({ _id: submittedJobs, isActive: true })
        .select('titleAndSalary matchedSeekers').populate('matchedSeekers')
        .then((jobs) => {
          res.status(200).json(jobs);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    // Seekers receive an array of jobs that they have matched for
    } else if (userType === 'seeker') {
      const seekerId = req.user._id;
      Job.find({ matchedSeekers: seekerId, isActive: true })
        .select('-matchedSeekers -likedSeekers')
        .populate('company')
        .then((jobs) => {
          res.status(200).json(jobs);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(500).json({ message: 'Some thing went wrong when we tried to find jobs.' });
    }
  })
  .put('/archive/:jobId', (req, res) => {
    // read information from jwt, params
    const seeker = req.user;
    const { userType } = req.user;
    const { jobId } = req.params;
    const { reverse } = req.body;
    // check userType before unnecessarily hitting db
    if (userType !== 'seeker') {
      return res.status(400).json({ message: 'Must be logged in as a job seeker to archive a job.' });
    }
    Job
      .findById(jobId).select('likedSeekers matchedSeekers')
      .then(() => {
        // grab all variables from seeker and job documents
        let { matchedJobs, archivedJobs } = seeker;
        if (reverse) {
          archivedJobs = archivedJobs.filter(job => job._id.toString() !== jobId);
          matchedJobs.push(jobId);
        } else {
          matchedJobs = matchedJobs.filter(job => job._id.toString() !== jobId);
          archivedJobs.push(jobId);
        }
        seeker
          .update({ matchedJobs, archivedJobs })
          .then(() => {
            // return changes and match boolean for newMatch event
            res.status(200).json({ jobId });
          }).catch(err => res.status(500).json({ at: 'Seeker update', message: err.message }));
      }).catch(err => res.status(500).json({ at: 'Find job', message: err.message }));
  })
  .get('/archived', (req, res) => {
    const { userType, archivedJobs } = req.user;
    if (userType !== 'seeker') {
      return res.status(400).json({ message: 'Must be logged in as a seeker to receive archived jobs.' });
    }
    Job.find({ _id: { $in: archivedJobs }, isActive: true })
      .select('-matchedSeekers -likedSeekers -skippedseekers -archivedSeekers')
      .populate('company')
      .then((jobs) => {
        res.status(200).json(jobs);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  })
  .put('/:jobId', (req, res) => {
    if (req.user.userType !== 'employer') {
      return res.status(401).json({ message: 'Must be logged in as employer to update job' });
    }
    const { jobId } = req.params;
    if (req.user.submittedJobs.indexOf(jobId) === -1) {
      // TODO discuss which fields should be editable
      return res.status(401).json({ message: 'You dont own that job' });
    }
    Job.findByIdAndUpdate(jobId, req.body).then(response => res.status(200).json(req.body))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .delete('/:jobId', (req, res) => {
    if (req.user.userType !== 'employer') {
      return res.status(401).json({ message: 'Must be logged in as employer to update job' });
    }
    const { jobId } = req.params;
    if (req.user.submittedJobs.indexOf(jobId) === -1) {
      // TODO discuss which fields should be editable
      return res.status(401).json({ message: 'You dont own that job' });
    }
    Job.findByIdAndRemove(jobId).then((response) => { res.status(200).json({ jobId }); })
      .catch(err => res.status(401).json({ message: err.message }));
  });


module.exports = router;
