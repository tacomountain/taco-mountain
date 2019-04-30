const User = require('../models/User');
const Customer = require('../models/Customer');

const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.cookies.session)
    .then(user => {
      if(!user) {
        const error = new Error('Invalid Authorization');
        error.status = 400;
        return next(error);
      }
      req.user = user;
      next();
    });
};

const adminAuth = (req, res, next) => {

};

const customerAuth = (req, res, next) => {

};

module.exports = {
  ensureAuth,
  adminAuth,
  customerAuth
};
