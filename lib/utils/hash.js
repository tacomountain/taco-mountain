const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function passHash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function comparePasswords(plainTextPW, hashedPW) {
  return bcrypt.compare(plainTextPW, hashedPW);
}

module.exports = {
  passHash,
  comparePasswords
};
