const express = require('express');
const passport = require('passport');
const Job = require('./jobModel');
// const Employer = require('../users/employer/employerModel');
// const Seeker = require('../users/seeker/seekerModel');

const router = express.Router();

router
    .all('*', passport.authenticate('bearer', { session: false }))
    .get('/', (req, res) => {
        const { _id, userType } = req.user;
        if (userType === "Employer") {
            Job
                .find({ company: _id })
                .then(jobs => {
                    res.status(200).json(jobs);
                }).catch(err => {
                    res.status(500).json(err);
                });
        } else if (userType === "Seeker") {
            const { topSkills, additionalSkills, familiarWith } = req.user;
            Job
                .find({ topSkills: { "$in": topSkills } })
                .then(jobs => {
                    // localJobs = jobs.filter(job => {
                    //     return job.location === seeker.location
                    // }) // TODO: Discuss localization with team
                    res.status(200).json(jobs);
                }).catch(err => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({ message: "Must be logged in as either an employer or a seeker to view jobs." })
        }
    }).post('/', (req, res) => {
        const { _id, userType } = req.user;
        const { company, titleAndSalary, topSkills, additionalSkills, familiarWith, description } = req.body;
        
    });

module.exports = router;