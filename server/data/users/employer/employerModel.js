const mongoose = require('mongoose');
const url = require('mongoose-type-url');

const bcrypt = require('bcrypt');


const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyUrl: { type: mongoose.SchemaTypes.Url, required: true },
  industry: { type: String },
  description: { type: String, required: true },
  username: { type: String, required: true },
  // TODO: ADD PASSWORD MIN-LENGTH BEFORE FINAL DEPLOY
  password: { type: String, maxlength: 20, required: true },
  email: { type: String, required: true },
  submittedJobs: [{ type: mongoose.Schema.Types.ObjectId }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
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

EmployerSchema.methods.authenticate = function (passwordGuess) {
  console.log('authenticating...');
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('Employer', EmployerSchema);
