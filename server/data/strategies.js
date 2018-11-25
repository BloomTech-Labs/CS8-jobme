const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const secret = process.env.ACCESS_KEY;
const Seeker = require('./users/seeker/seekerModel');
const Employer = require('./users/employer/employerModel');

function strategies() {
  // serialize/deserialize seekers
  passport.serializeUser((seeker, done) => {
    done(null, seeker._id);
  });
  passport.deserializeUser((seekerId, done) => {
    Seeker.findById(seekerId, (err, user) => done(err, user));
  });

  // serialize/deserialize employers
  passport.serializeUser((employer, done) => {
    done(null, employer._id);
  });
  passport.deserializeUser((employerId, done) => {
    Employer.findById(employerId, (err, user) => done(err, user));
  });


  // strategy for handling requests for restricted endpoints
  // checks for JWT on Bearer token in Auth headers
  passport.use(new BearerStrategy((token, done) => {
    const { sub, userType, exp } = jwt.verify(token, secret);
    // check if expired
    if (exp <= Date.now()) {
      return done(null, false);
    }
    // check user type and search fo user in appropriate model
    if (userType === 'seeker') {
      Seeker.findById(sub) // search seekers
        .select('-password -createdOn -__v')
        .then((seeker) => {
          if (!seeker) {
            return done(null, false);
          }
          return done(null, seeker);
        })
        .catch(() => done(null, false));
    } else if (userType === 'employer') {
      Employer.findById(sub) // search employers
        .select('-password -createdOn -__v')
        .then((employer) => {
          if (!employer) {
            return done(null, false);
          }
          return done(null, employer);
        })
        .catch(() => done(null, false));
    } else {
      return done(null, false); // we don't have any other types
    }
  }));
}
module.exports = strategies;
