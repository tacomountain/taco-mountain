const jwt = require('jsonwebtoken');

const EXPIRE = '24h';

function tokenize(payload) {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRE });
}

function untokenize(token) {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  } catch(err) {
    throw 'Bad token';
  }
}

module.exports = {
  tokenize,
  untokenize
};
