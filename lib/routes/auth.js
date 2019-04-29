const { Router } = require('express');
const User = require('../models/User');
const Customer = require('../models/Customer');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup/admin', async(req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User 
        .create({ username, password, role: 'admin' });
      const token = await user.authToken();

      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      res.send(user);
    } catch(error) {
      next(error);
    }
  })

  .post('/signup/customer', (req, res, next) => {
    const { username, displayName, password, phoneNumber } = req.body;
    User
      .create({ username, password, role: 'customer' })
      .then(newUser => Customer.create({
        displayName,
        phoneNumber,
        user: newUser._id
      }))
      .then(newCustomer => res.send(newCustomer))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { name, password } = req.body;

    User
      .findOne({ name });
  });
