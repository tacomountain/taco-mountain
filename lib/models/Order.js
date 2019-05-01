const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  food: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      purchasePrice: {
        type: Number,
        required: true
      },
      _id: false
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  tip: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  versionKey: false,
  timestamps: true
});

orderSchema.statics.topSpender = function() {
  return this.aggregate([
    {
      '$lookup': {
        'from': 'customers', 
        'localField': 'customer', 
        'foreignField': '_id', 
        'as': 'customer'
      }
    }, {
      '$unwind': {
        'path': '$customer'
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'customer.user', 
        'foreignField': '_id', 
        'as': 'customer'
      }
    }, {
      '$unwind': {
        'path': '$customer'
      }
    }, {
      '$project': {
        'customer.passwordHash': false, 
        'customer.role': false, 
        'food': false, 
        'subtotal': false
      }
    }, {
      '$group': {
        '_id': '$customer', 
        'totalSpent': {
          '$sum': '$total'
        }
      }
    }, {
      '$sort': {
        'totalSpent': -1
      }
    }, {
      '$limit': 10
    }
  ]);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
