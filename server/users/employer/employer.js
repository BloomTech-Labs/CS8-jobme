const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = require('mongoose-type-url');
const ObjectId = mongoose.Schema.Types.ObjectId;

const EmployerSchema = new Schema({
  companyName: { type: String, required: true, unique: true },
  companyUrl: {
    profile: mongoose.SchemaTypes.Url
  },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, maxlength: 10 },
  email: { type: String, required: true },
  submittedJobs: [{ type: ObjectId }]
});

EmployerSchema.pre('save', function (next) {
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
