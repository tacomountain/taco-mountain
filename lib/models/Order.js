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

orderSchema.statics.totalSales = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': null, 
        'total': {
          '$sum': '$subtotal'
        }
      }
    }, 
    {
      '$project': {
        '_id': false
      }
    }
  ]);
};

orderSchema.statics.totalCost = function() {
  return this.aggregate([
    {
      '$unwind': {
        'path': '$food'
      }
    }, {
      '$addFields': {
        'temp': '$food.foodItem'
      }
    }, {
      '$lookup': {
        'from': 'foods', 
        'localField': 'temp', 
        'foreignField': '_id', 
        'as': 'foodArray'
      }
    }, {
      '$unwind': {
        'path': '$foodArray'
      }
    }, {
      '$addFields': {
        'unitCost': '$foodArray.unitCost'
      }
    }, {
      '$group': {
        '_id': null, 
        'totalCost': {
          '$sum': '$unitCost'
        }
      }
    }
  ]);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
