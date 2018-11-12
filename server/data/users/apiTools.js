const jwt = require('jsonwebtoken');
const Seeker = require('./seeker/seekerModel');
const Employer = require('./employer/employerModel');
const nodemailer = require('nodemailer');

const sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY);
const decode = (token) => jwt.decode(token, process.env.SECRET_KEY);

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

const { SMTP_URL } = process.env;
const defaultEmailData = { from: 'RcruitApp@gmail.com' };

const sendMail = async (emailData, smtpUrl = SMTP_URL) => {
  const completeEmailData = Object.assign(defaultEmailData, emailData);
  const transporter = nodemailer.createTransport(smtpUrl);
  const result = await transporter.sendMail(completeEmailData);
  return result;
};

const randomString = (length) => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789-_=+';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = {
  sign,
  decode,
  userExist,
  sendMail,
  randomString,
};
