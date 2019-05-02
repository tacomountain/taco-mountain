const Customer = require('../models/Customer');
const Order = require('../models/Order');
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
  
  })

  .get('/topSpenders', adminAuth, (req, res, next) => {
    Order.topSpender()
      .then(topSpenders => {
        res.send(topSpenders);
      })
      .catch(next);
  });


