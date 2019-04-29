const mongoose = require('mongoose');
const { passHash, comparePasswords } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');
const Customer = require('./Customer');

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    required: true
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
    }
  }, 
  versionKey: false
});

userSchema.virtual('password').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next){
  passHash(this._tempPassword)
    .then(hashPassword => {
      this.passwordHash = hashPassword;    
      next();
    });
});

userSchema.methods.compare = function(password) {
  return comparePasswords(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return Customer.findOne({ user: this._id })
    .lean()
    .then(customer => {
      return tokenize({ ...this.toJSON(), customer });
    });
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

userSchema.statics.signIn = async function(username, password) {
  const user = await this.findOne({ username });
  if(!user) return null;

  const result = await this.compare(password);
  if(!result) return null;

  const token = await this.authToken();

  return { user, token };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
