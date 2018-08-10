/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-console: 0 */

const mongoose = require('mongoose');
const fs = require('fs');
const chai = require('chai');
const Seeker = require('../../data/users/seeker/seekerModel');
const Employer = require('../../data/users/employer/employerModel');
const Job = require('../../data/jobs/jobModel');

const expect = chai.expect;
const seekers = JSON.parse(fs.readFileSync('./server/tests/data/users/seeker/dummyData.json'));
const employers = JSON.parse(fs.readFileSync('./server/tests/data/users/employer/dummyData.json'));
const jobs = JSON.parse(fs.readFileSync('./server/tests/data/jobs/dummyData.json'));

employers.forEach((employer) => {
  employer.description = employer.description.slice(0, 255);
});

seekers.forEach((seeker) => {
  seeker.summary = seeker.summary.slice(0, 255);
});

const configDBUSER = process.env.DB_USER;
const configDBPASS = process.env.DB_PASS;

const dbUrl = process.env.NODE_ENV === 'production'
  ? `mongodb://${configDBUSER}:${configDBPASS}@ds239681.mlab.com:39681/jobme`
  : 'mongodb://localhost:27017/jobme';

describe('Database Tests', () => {
  before(function (done) {
    this.timeout(0);
    mongoose.connect(dbUrl);
    // connect to database and clear each collection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      async function clearAndFill() {
        await Employer.deleteMany({});
        await Job.deleteMany({});
        await Seeker.deleteMany({});
        await Employer.create(employers);
        await Seeker.create(seekers);
      }
      clearAndFill()
        .then(() => {
          done();
        });
    });
  });
  describe('saved seekers and employers', () => {
    it('should save 100 valid employers and seekers to test database', function (done) {
      this.timeout(0);
      Employer.countDocuments({})
        .then((savedEmployers) => {
          Seeker.countDocuments({})
            .then((savedSeekrs) => {
              expect(savedEmployers).to.equal(100);
              expect(savedSeekrs).to.equal(100);
              done();
            }).catch(() => done());
        }).catch(() => done());
    });
  });
  describe('add 3 jobs to each employer', () => {
    it('should create 3 jobs for each of the first ten employers', function (done) {
      this.timeout(0);
      // grab first ten employer emails from dummyData
      const emails = employers.map(employer => employer.email);
      // find employers in db
      Employer.find({ email: { $in: emails } })
        .then((jobOwners) => {
          // post on job per employer
          const jobPosting = jobOwners.forEach((jobOwner) => {
            const { submittedJobs } = jobOwner;
            const job = jobs[Math.floor(Math.random() * 100)];
            job.company = jobOwner._id;
            return Job.create(job)
              .then((createdJob) => {
                submittedJobs.push(createdJob._id);
                Employer
                  .findByIdAndUpdate(jobOwner._id, { submittedJobs })
                  .then(employer => expect(employer.submittedJobs).to.have.lengthOf(0))
                  .catch(err => console.log(err));
              }).catch(err => console.log(err));
          });
          Promise.all(jobPosting)
            .then(() => {
              done();
            }).catch((err) => {
              console.log(err);
              done();
            });
        });
    });
  });
  after(function (done) {
    done();
  });
});
