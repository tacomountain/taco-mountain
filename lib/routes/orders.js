const { Router } = require('express');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { customerAuth, adminAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', customerAuth, async(req, res, next) => {
    try {
      const { food, subtotal, tip, total } = req.body;
      const customer = req.user.profile._id;
      // patch customer - update customer rewards +1 per order
      const customerRewards = await Customer
        .findById(customer)
        .then(foundCustomer => {
          foundCustomer.rewards ++;
          return foundCustomer;
        })
        .then(updatedCustomer => {
          return Customer
            .findByIdAndUpdate(customer, updatedCustomer, { new: true })
            .lean()
            .select({ rewards: true });
        });

      const order = await Order
        .create({ customer, food, subtotal, tip, total });

      res.send({ order, customerRewards });
    } catch(err) {
      next(err);
    }
  })
  
  .get('/', adminAuth, (req, res, next) => {
    Order
      .find()
      .lean()
      .then(orders => res.send(orders))
      .catch(next);
  })
  
  .get('/profitsByFood', adminAuth, (req, res, next) => {
    Order
      .profitsByFood()
      .then(list => res.send(list))
      .catch(next);
  });
