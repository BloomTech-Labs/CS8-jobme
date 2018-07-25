/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
const mongoose = require('mongoose');
const fs = require('fs');
const chai = require('chai');
const Employer = require('../../../../data/users/employer/employerModel');

const expect = chai.expect;
const employers = JSON.parse(fs.readFileSync('./server/tests/data/users/employer/dummyData.json'));


// Create a new collection called 'Employer'
describe('Database Tests', () => {
  // Before starting the test, create a sandboxed database connection
  // Once a connection is established invoke done()
  before((done) => {
    mongoose.connect('mongodb://localhost/local');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', () => {
    it('should save employer saved to test database', (done) => {
      const goodEmployer = new Employer(employers[0]);
      goodEmployer.save(done);
    });
    it('Doesn\'t save when email is missing', (done) => {
      // Attempt to save with wrong info. An error should trigger
      const corruptedData = { ...employers[0], email: null }
      const badEmployer = new Employer(corruptedData);
      badEmployer.save((err) => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', (done) => {
      // Look up the 'Mike' object previously saved.
      Employer.find({ email: employers[0].email }, (err, email) => {
        if (err) { throw err; }
        if (email.length === 0) { throw new Error('No data!'); }
        done();
      });
    });
  });
  // After all tests are finished drop database and close connection
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
