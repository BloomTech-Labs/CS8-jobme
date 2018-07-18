const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const Employer = require('./employerRoutes');
const config = require('../../../../config'); // get db config file

module.exports = function strat(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      Employer.findOne({ id: jwtPayload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }),
  );
};
