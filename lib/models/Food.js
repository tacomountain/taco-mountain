const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  price: {
    type: Number,
    // can't be less than free
    min: 0,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['appetizer', 'entree', 'drink']
  },
  unitCost: {
    type: Number,
    // can't be less that free to make
    min: 0,
    required: true
  },
  image: {
    type: String,
    default: 'https://creativeconnections.org/wp-content/uploads/2015/07/MEX-14-075-e1437626610793.jpg'
  }
}, { versionKey: false });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
