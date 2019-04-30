const { Router } = require('express');
const Food = require('../models/Food');
const { adminAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', adminAuth, (req, res, next) => {
    const { name, price, type, unitCost, image } = req.body;
    Food
      .create({ name, price, type, unitCost, image })
      .then(newFood => res.send(newFood))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Food
      .find()
      .lean()
      .then(allFoods => res.send(allFoods))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Food
      .findById(req.params.id)
      .lean()
      .then(food => res.send(food))
      .catch(next);
  });
