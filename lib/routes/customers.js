const Customer = require('../models/Customer');
const { Router } = require('express');
const { adminAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/topRewards', adminAuth, (req, res, next) => {
    Customer.topCustomer()
      .then(topCustomers => {
        res.send(topCustomers);
      })
      .catch(next);
  });
  