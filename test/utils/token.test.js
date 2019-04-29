require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('tokens', () => {
  it('create a token', () => {
    const token = tokenize({ username: 'billy' });
    expect(token).toEqual(expect.any(String));
  });

  it('takes the mumby jumby and returns an object', () => {
    const token = tokenize({ username: 'billy' });
    const obj = untokenize(token);
    expect(obj).toEqual({ username: 'billy' });
  });

  it('can verify a token with expiration', () => {
    const token = tokenize({ username: 'billy' });
    const body = jwt.verify(token, process.env.AUTH_SECRET, { expiresIn: '1h' });
    expect(body).toEqual({ payload: { username: 'billy' }, iat: expect.any(Number), exp: expect.any(Number) });
  });

  it('returns error for bad token', () => {
    expect(() => untokenize('asbd')).toThrow('Bad token');
  });
});
