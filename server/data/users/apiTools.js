const jwt = require('jsonwebtoken');
const Seeker = require('./seeker/seekerModel');
const Employer = require('./employer/employerModel');

const sign = (payload) => jwt.sign(payload, process.env.ACCESS_KEY);
const decode = (token) => {
  try{
   return jwt.verify(token, process.env.ACCESS_KEY);
  }
  catch(err){
    // Respond To This Invalid Key
    console.error(err);
  }
};

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

module.exports = {
  sign,
  decode,
  userExist
}