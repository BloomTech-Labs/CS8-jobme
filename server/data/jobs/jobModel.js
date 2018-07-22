const mongoose = require('mongoose');
const url = require('mongoose-type-url');


const JobSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, required: true},
  titleAndSalary: { type: String, required: true },
  topSkills: { type: [String], required: true },
  additionalSkills: [String],
  familiarWith: [String],
  description: { type: String, required: true },
  likedSeekers: [mongoose.Schema.Types.ObjectId],
  matchedSeekers: [mongoose.Schema.Types.ObjectId],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

module.exports = mongoose.model('Job', JobSchema);