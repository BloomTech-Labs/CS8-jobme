const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Company - can add users/delete users
// Company Url
// Industry
// Description
// Username
// Password
// Email
// Submitted Jobs - (F.K. to job)

const url = require('mongoose-type-url');
const ObjectId = mongoose.Schema.Types.ObjectId;

const EmployerSchema = new Schema({
  companyname: { type: String, required: true, unique: true },
  companyurl: {
    profile: mongoose.SchemaTypes.Url
  },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, maxlength: 10 },
  email: { type: String, required: true },
  submittedjobs: [{ type: ObjectId }]
});

EmployerSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 13, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

EmployerSchema.methods.authenticate = function(passwordGuess) {
  console.log('authenticating...');
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', UserSchema);
