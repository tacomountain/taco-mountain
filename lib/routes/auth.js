const { Router } = require('express');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Food = require('../models/Food');

module.exports = Router()
  .post('/signup/admin', async(req, res, next) => {
    try {
      const { name, password, phone } = req.body;
      const user = await User
        .create({ name, password, phone, role: 'admin' });
      const token = await user.authToken();

      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      // This makes it a bit more clear what is happening
      const withProfile = await user.withProfile();
      res.send(withProfile);
    } catch(error) {
      next(error);
    }
  })

  .post('/signup/customer', async(req, res, next) => {
    try {
      const { name, password, phone } = req.body;
      const user = await User
        .create({ name, password, phone, role: 'customer' });

      await Customer.create({ user: user._id });

      const token = await user.authToken();
      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      // This makes it a bit more clear what is happening
      const withProfile = await user.withProfile();
      res.send(withProfile);
    } catch(error) {
      next(error);
    }
  })

  .post('/signin', (req, res, next) => {
    const { phone, password } = req.body;
    User
      .signIn(phone, password)
      .then(result => {
        if(!result) {
          const error = new Error('Invalid login');
          error.status = 401;
          res.send(error);
          return next(error);
        }
        const { token, user } = result;
        res.cookie('session', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });

        res.send(user);
      })
      .catch(next);
  })

  // Path to check seed data
  .get('/', (req, res, next) => {
    Food
      .find()
      .lean()
      .then(allFoods => res.send(allFoods))
      .catch(next);
  });
