const jwt = require('jsonwebtoken');
const Seeker = require('./users/seeker/seekerModel');
const Employer = require('./users/employer/employerModel');

const sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY);
const decode = (token) => jwt.decode(token, process.env.SECRET_KEY);
const EXPIRATION = 1000 * 60 * 60 * 12;

const userExist = (req, res) => {
  // Check For A valid token w/ email
  if(!req.body.token || !decode(req.body.token) || !decode(req.body.token).email) return res.send({exist: 2, message:'UNAUTHORIZED'});

  // Assign email from token
  const email = decode(req.body.token).email;

  // Search in seekers collection
  Seeker.findOne({email})
  
  // Found Seeker Error
  .then((seeker) =>seeker ? res.send({exist: 1, message: 'SEEKER EXIST'}) : Promise.reject())
  
  // Continue Search
  .catch(() => {

    // Search Employers For Email
    Employer.findOne({email})

    // Found Employer Error
    .then((employer) =>employer ? res.send({exist: 1, message: 'EMPLOYER EXIST'}) : Promise.reject())
    
    // EMAIL has not been used
    .catch(() => {
      res.send({exist: 0, message: 'EMAIL NOT USED'});
    });
  });
}

const verifyUser = async (auth) => {
  return await Seeker.findById(auth.id)
  .then((seeker) => {
    if(!seeker || seeker.password !== auth.password) 
      return Promise.reject();
    seeker.password = undefined;
    return seeker;
  })
  .catch(async() => { 
    return await Employer.findById(auth.id)
    .then((employer) => {
      if(!employer || employer.password !== auth.password) 
        return Promise.reject();
      employer.password = undefined;
      return employer;
    })
    .catch(() => {
      return "Not Found";
    })
  });
}

module.exports = {
  sign,
  decode,
  userExist,
  verifyUser,
  EXPIRATION
}