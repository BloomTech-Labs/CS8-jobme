const passport = require('passport');
const jwt = require('jwt-simple');
const BearerStrategy = require('passport-http-bearer').Strategy;
const secret = process.env.SECRET_KEY || require('../../config').secret;
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


    //strategy for handling requests for restricted endpoints
    //checks for JWT on Bearer token in Auth headers
    passport.use(new BearerStrategy((token, done) => {
        const { email, userType } = jwt.decode(token, secret);
        // check user type and search fo user in appropriate model
        if (userType === "Seeker") {
            Seeker.findOne({ email }) //search seekers
            .select('-password -_id -createdOn -__v')
            .then(seeker => {
                if (!seeker) {
                return done(null, false);
                }
                return done(null, seeker);
            })
            .catch(err => {
                return done(null, false);
            });
        } else if (userType === "Employer") {
            Employer.findOne({ email }) // search employers
            .select('-password -_id -createdOn -__v')
            .then(employer => {
                if (!employer) {
                return done(null, false);
                }
                return done(null, employer);
            })
            .catch(err => {
                return done(null, false);
            });
        } else {
            return done(null, false); // we don't have any other types
        }

    }));
}
module.exports = strategies;