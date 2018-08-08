const mongoose = require('mongoose');
const History = require('./historyModel');

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  matchedJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
  read: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  fromModel: String,
  fromId: mongoose.Schema.Types.ObjectId,
  toModel: String,
  toId: mongoose.Schema.Types.ObjectId,
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
      $and: [
        { $or: [{ seekerId: this.toId }, { employerId: this.fromId }] },
        { $or: [{ seekerId: this.fromId }, { employerId: this.toId }] },
      ],
    }).then((history) => {
      history.messages.push(this._id);
      history.save();
    }).catch(() => {
      let seekerId;
      let employerId;
      if (this.toModel === 'Seeker') {
        seekerId = this.toId;
        employerId = this.fromId;
      } else {
        seekerId = this.fromId;
        employerId = this.toId;
      }
      History.create({
        seekerId,
        employerId,
        messages: [this],
        matchedJob: this.matchedJob,
      });
    });
});

module.exports = mongoose.model('Message', MessageSchema);
