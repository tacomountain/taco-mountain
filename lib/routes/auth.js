const { Router } = require('express');
const User = require('../models/User');
const Customer = require('../models/Customer');
// const { ensureAuth } = require('../middleware/ensureAuth');

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

      const untokenized = await User.findByToken(token);
      res.send(untokenized);
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
      const untokenized = await User.findByToken(token);
      res.send(untokenized);
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
          return next(error);
        }
        const { token } = result;
        res.cookie('session', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        User.findByToken(token)
          .then(untokenized => res.send(untokenized));
      })
      .catch(next);
  });
