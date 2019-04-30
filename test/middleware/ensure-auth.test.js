require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth, adminAuth, customerAuth } = require('../../lib/middleware/ensure-auth');

describe('ensure auth', () => {

  it('validates a good token', done => {
    const token = tokenize({
      username: 'me'
    });

    const req = { cookies: { session: token } };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        username: 'me'
      });
      done();
    };
    ensureAuth(req, res, next);
  });

  it('checks for admin auth', () => {
    const req = { user: { role: 'admin' } };
    const res = {};
    const next = jest.fn();
    adminAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('checks for not admin auth', () => {
    const req = { user: { role: 'customer' } };
    const res = {};
    const next = jest.fn();
    adminAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('checks for customer auth', () => {
    const req = { user: { role: 'customer' } };
    const res = {};
    const next = jest.fn();
    customerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('checks for not customer auth', () => {
    const req = { user: { role: 'waiter' } };
    const res = {};
    const next = jest.fn();
    customerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });


});
