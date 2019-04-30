const { Router } = require('express');
const Food = require('../models/Food');
const { customerAuth, adminAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', adminAuth, (req, res, next) => {
    const { name, price, type, unitCost, image } = req.body;
    Food
      .create({ name, price, type, unitCost, image })
      .then(newFood => res.send(newFood))
      .catch(next);
  });
