require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensure-auth');

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
});
