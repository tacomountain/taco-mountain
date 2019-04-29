const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rewards: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
