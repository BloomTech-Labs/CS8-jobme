const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  matchedJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  seekerHasNew: { type: Boolean, default: true },
  employerHasNew: { type: Boolean, default: true },
});

module.exports = mongoose.model('History', HistorySchema);
