const mongoose = require('mongoose');
const History = require('./historyModel');

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  matchedJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  archived: { type: Boolean, default: false },
  fromModel: String,
  fromId: { type: mongoose.Schema.Types.ObjectId, required: true },
  toModel: String,
  toId: { type: mongoose.Schema.Types.ObjectId, required: true },
  history: { type: mongoose.Schema.Types.ObjectId, ref: 'History' },
}, { toObject: { virtuals: true } });

MessageSchema.virtual('from', {
  ref: doc => doc.fromModel, // The model to use, conditional on the doc
  localField: 'fromId', // Find people or organizations where `localField`
  foreignField: '_id', // is equal to `foreignField`
  justOne: true, // and return only one
});

MessageSchema.virtual('to', {
  ref: doc => doc.toModel, // The model to use, conditional on the doc
  localField: 'toId', // Find people or organizations where `localField`
  foreignField: '_id', // is equal to `foreignField`
  justOne: true, // and return only one
});

/* eslint prefer-arrow-callback: 0 */
MessageSchema.pre('save', function makeHistory() {
  History
    .findOne({
      $or: [
        { $and: [{ seeker: this.toId }, { employer: this.fromId }] },
        { $and: [{ seeker: this.fromId }, { employer: this.toId }] },
      ],
    }).then((history) => {
      let { messages, seekerHasNew, employerHasNew } = history;
      // if it's coming from Employer, Seeker has new and vice versa
      if (this.fromModel === 'Employer') {
        seekerHasNew = true;
      } else {
        employerHasNew = true;
      }
      messages.unshift(this._id);
      history.update({ messages, seekerHasNew, employerHasNew })
        .then(() => {
          this.update({ history: history._id })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }).catch(() => {
      let seeker;
      let employer;
      let seekerHasNew;
      let employerHasNew;
      // new history with one seeker and one employer - one person has new
      if (this.fromModel === 'Employer') {
        seeker = this.toId;
        employer = this.fromId;
        seekerHasNew = true;
        employerHasNew = false;
      } else {
        seeker = this.fromId;
        employer = this.toId;
        employerHasNew = true;
        seekerHasNew = false;
      }
      History.create({
        seeker,
        employer,
        seekerHasNew,
        employerHasNew,
        messages: [this],
        matchedJob: this.matchedJob,
      }).then((history) => {
        this.update({ history: history._id })
          .catch(err => console.log(err));
      });
    });
});

module.exports = mongoose.model('Message', MessageSchema);
