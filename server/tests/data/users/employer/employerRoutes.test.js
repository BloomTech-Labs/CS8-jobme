/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
const mongoose = require('mongoose');
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = 'http://localhost:5000';
const expect = chai.expect;
const employers = JSON.parse(fs.readFileSync('./server/tests/data/users/employer/dummyData.json'));

chai.use(chaiHttp);
// Create a new collection called 'Employer'
describe('Employer server tests', () => {
  // Before starting the test, create a sandboxed database connection
  // Once a connection is established invoke done()
  before((done) => {
    done(); // nothing to do here yet
  });
  describe('Tests for employer routes', () => {
    it('should save employer on [POST] to `api/employers`', (done) => {
      const goodEmployer = employers[0];
      chai.request(app)
        .post('/api/employers')
        .send(goodEmployer)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
    });
    it('Doesn\'t save when email is missing', (done) => {
      // Attempt to save with wrong info. An error should trigger
      const badEmployer = { ...employers[0], email: null };
      chai.request(app)
        .post('/api/employers')
        .send(badEmployer)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });
    it('Should retrieve data from test database', (done) => {
      // Look up the 'Mike' object previously saved.
      chai.request(app)
        .get('/api/employers')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
    });
    // After all tests are finished drop database and close connection
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
      });
    });
  });
});
