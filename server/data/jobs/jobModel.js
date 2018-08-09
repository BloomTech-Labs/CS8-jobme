const mongoose = require('mongoose');
const url = require('mongoose-type-url');


const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
    ref: 'Employer',
  },
  titleAndSalary: { type: String, required: true },
  topSkills: { type: [String], maxlength: 5, required: true, lowercase: true },
  additionalSkills: { type: [String], maxlength: 10, lowercase: true },
  familiarWith: { type: [String], maxlength: 10, lowercase: true },
  description: { type: String, required: true },
  likedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  skippedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  matchedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  archivedSeekers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Job', JobSchema);
