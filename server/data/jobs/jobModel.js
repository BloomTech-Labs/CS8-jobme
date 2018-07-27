const mongoose = require('mongoose');
const url = require('mongoose-type-url');


const JobSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false, ref: 'Employer' },
  titleAndSalary: { type: String, required: true },
  topSkills: { type: [String], required: true },
  additionalSkills: [String],
  familiarWith: [String],
  description: { type: String, required: true },
  likedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  matchedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

module.exports = mongoose.model('Job', JobSchema);
