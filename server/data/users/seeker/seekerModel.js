const mongoose = require('mongoose');
const url = require('mongoose-type-url');
const bcrypt = require('bcrypt');


const SeekerSchema = new mongoose.Schema({
  // TODO: make /login sign userType directly into payload and delete field
  userType: { type: String, default: 'Seeker' },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  desiredTitle: { type: String },
  summary: { type: String, required: true },
  experience: { type: String },
  education: { type: String },
  topSkills: { type: [String], required: true, maxlength: 5 },
  additionalSkills: { type: [String] },
  familiarWith: { type: [String] },
  // TODO: ADD PASSWORD MIN-LENGTH BEFORE FINAL DEPLOY
  password: { type: String, maxlength: 20, required: true },
  likedJobs: [mongoose.Schema.Types.ObjectId],
  matchedJobs: [mongoose.Schema.Types.ObjectId],
  credits: { type: Number, default: 20 },
  appsAvailable: { type: Number, default: 3 },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

SeekerSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, 13, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

SeekerSchema.methods.validify = function (passwordGuess) {
  console.log('authenticating...');
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('Seeker', SeekerSchema);
