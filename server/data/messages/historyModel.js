const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  matchedJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('History', HistorySchema);
