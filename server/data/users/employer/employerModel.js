const mongoose = require('mongoose');
const url = require('mongoose-type-url');

const bcrypt = require('bcrypt');


const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyUrl: { type: mongoose.SchemaTypes.Url, required: true },
  industry: { type: String },
  description: { type: String, required: true },
  username: { type: String },
  password: { type: String, maxlength: 10 },
  email: { type: String },
  submittedJobs: [{ type: mongoose.Schema.Types.ObjectId }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

EmployerSchema.pre('save', (next) => {
  bcrypt.hash(this.password, 13, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

EmployerSchema.methods.authenticate = passwordGuess => bcrypt.compare(passwordGuess, this.password);

module.exports = mongoose.model('Employer', EmployerSchema);
