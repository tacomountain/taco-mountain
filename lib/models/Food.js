const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['appetizer', 'entree', 'dessert', 'drink']
  },
  unitCost: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'https://creativeconnections.org/wp-content/uploads/2015/07/MEX-14-075-e1437626610793.jpg'
  }
}, { versionKey: false });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
