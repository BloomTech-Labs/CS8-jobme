const mongoose = require('mongoose');
const url = require('mongoose-type-url');
const bcrypt = require('bcrypt');


const SeekerSchema = new mongoose.Schema({
  userType: { type: String, default: 'seeker' },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  desiredTitle: { type: String },
  summary: { type: String, required: true },
  experience: { type: String, required: true },
  education: { type: String, required: true },
  topSkills: { type: [String], required: true, maxlength: 5 },
  additionalSkills: { type: [String] },
  familiarWith: { type: [String] },
  password: { type: String, maxlength: 20, required: true },
  likedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  skippedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  matchedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  archivedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  credits: { type: Number, default: 20 },
  appsAvailable: { type: Number, default: 3 },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  imgUrl: String,
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
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('Seeker', SeekerSchema);
