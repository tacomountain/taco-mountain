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

orderSchema.statics.profitsByFood = function() {
  return this.aggregate([
    {
      '$unwind': { 'path': '$food' }
    }, {
      '$group': {
        '_id': '$food.foodItem',
        'count': { '$sum': 1 },
        'totalSale': { '$sum': '$food.purchasePrice' }
      }
    }, {
      '$lookup': {
        'from': 'foods',
        'localField': '_id',
        'foreignField': '_id',
        'as': '_id'
      }
    }, {
      '$unwind': { 'path': '$_id' }
    }, {
      '$project': {
        'item': '$_id',
        'count': true,
        'totalSale': true,
        '_id': false,
        'totalProfit': {
          '$subtract': [
            '$totalSale', { '$multiply': ['$_id.unitCost', '$count'] }
          ]
        }
      }
    }, {
      '$sort': { 'totalProfit': -1 }
    }, {
      '$limit': 10
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



orderSchema.statics.topTenMenuItems = function() {
  return this.aggregate(
    [
      {
        '$unwind': {
          'path': '$food', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$group': {
          '_id': '$food.foodItem', 
          'purchased': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'purchased': -1
        }
      }, {
        '$lookup': {
          'from': 'foods', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'name'
        }
      }, {
        '$unwind': {
          'path': '$name', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$addFields': {
          'name': '$name.name', 
          'price': '$name.price'
        }
      }, {
        '$limit': 10
      }
    ]
  );
};



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
