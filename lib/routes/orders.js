const { Router } = require('express');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { customerAuth, adminAuth } = require('../middleware/ensure-auth');


module.exports = Router()
  .post('/', customerAuth, async(req, res, next) => {
    try {
      const { food, subtotal, tip, total } = req.body;
      const customer = req.user.profile._id;
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
      .populate({ path: 'customer', 
        populate: { path: 'user' }
      })
      .lean()
      .then(orders => res.send(orders))
      .catch(next);
  })


  .get('/totalSales', adminAuth, (req, res, next) => {
    Order.totalSales()
      .then(totalSales => res.send(totalSales))
      .catch(next);
  })

  .get('/totalProfitMargin', adminAuth, async(req, res, next) => {
    try {
      const cost = await Order.totalCost();
      const sales = await Order.totalSales();
      const profit = (sales[0].total - cost[0].totalCost).toFixed(2);
      res.send({ profit });
    } catch(error) {
      next(error);
    }
  })
  
  .get('/profitsByFood', adminAuth, (req, res, next) => {
    Order
      .profitsByFood()
      .then(list => res.send(list))
      .catch(next);
  })

  .get('/topMenuItems', (req, res, next) => {
    Order.topTenMenuItems()
      .then(topItems => {
        res.send(topItems);
      })
      .catch(next);
  });
