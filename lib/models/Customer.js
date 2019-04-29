const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema ({
  displayName: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  phoneNumber: {
    type: String,
    match: /\d{10}/,
    required: true
  },
  rewards: {
    type: Number,
    default: 0
  },
  profilePhoto: {
    type: String,
    default: 'https://p16.muscdn.com/img/musically-maliva-obj/1629859208383493~c5_720x720.jpeg'
  }
}, {
  versionKey: false
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
