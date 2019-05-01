const User = require('../models/User');

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
  if(req.user.role !== 'admin') {
    const error = new Error('Invalid Authorization: Not an Admin');
    error.status = 401;
    return next(error);
  }
  return next();
};

const customerAuth = (req, res, next) => {
  if(req.user.role !== 'customer') {
    const error = new Error('Invalid Authorization: Not a Customer');
    error.status = 401;
    return next(error);
  }
  return next();
};

module.exports = {
  ensureAuth,
  adminAuth,
  customerAuth
};
