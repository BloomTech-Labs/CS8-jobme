const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-type-url');


const EmployerSchema = new mongoose.Schema({
  userType: { type: String, default: 'employer' },
  companyName: { type: String, required: true },
  companyUrl: { type: mongoose.SchemaTypes.Url, required: true },
  industry: { type: String },
  description: { type: String, required: true, maxlength: 256 },
  password: { type: String, minlength: 8, required: true },
  email: { type: String, required: true, unique: true },
  submittedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  credits: { type: Number, default: 20 },
  postsAvailable: { type: Number, default: 5 },
  callsAvailable: { type: Number, default: 3 },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  imgUrl: String,
  previousMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
  resetNonce: String,
});

EmployerSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, 13, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

/* eslint func-names: 0 */
EmployerSchema.methods.validify = function validify(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('Employer', EmployerSchema);
