require('dotenv').config();
const { Router } = require('express');
const Order = require('../models/Order');
const { customerAuth, adminAuth } = require('../middleware/ensure-auth');
const { create, profitMargin } = require('../services/order-service');

module.exports = Router()
  .post('/', customerAuth, async(req, res, next) => {
    try {
      const { food, subtotal, tip, total } = req.body;
      const { order, customerRewards } = create({
        food,
        subtotal,
        tip,
        total,
        user: req.user
      });

      res.send({ order, customerRewards });
    } catch(err) {
      next(err);
    }
  })

  .get('/', adminAuth, (req, res, next) => {
    Order
      .find()
      .populate({
        path: 'customer',
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
      const profit = await profitMargin();
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
