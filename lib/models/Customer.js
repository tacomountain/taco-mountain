const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rewards: {
    type: Number,
    // can't have negative rewards
    min: 0,
    default: 0
  }
}, {
  versionKey: false
});

customerSchema.statics.topCustomer = function() {
  return this.aggregate([
    { '$sort': { 'rewards': -1 } },
    { '$limit': 10 },
    {
      '$lookup': {
        'from': 'users',
        'localField': 'user',
        'foreignField': '_id',
        'as': 'user'
      }
    },
    { '$unwind': '$user' },
    {
      '$addFields': {
        'name': '$user.name',
        'phone': '$user.phone'
      }
    },
    {
      '$project': { 'user': false }
    }
  ]);
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
