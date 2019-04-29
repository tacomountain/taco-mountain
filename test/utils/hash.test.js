const { passHash, comparePasswords } = require('../../lib/utils/hash');
const bcrypt = require('bcrypt');

describe('hash test', () => {
  it('will take a password and return a hashed password', () => {
    const password = 'myNeatPassword';
    return passHash(password)
      .then(hashedPassword => {
        return Promise.all([
          hashedPassword,
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hashedPassword, bcryptHashedPassword]) => {
        expect(hashedPassword).not.toEqual(bcryptHashedPassword);
        expect(hashedPassword).not.toEqual(password);
      });
  });
  it('can compare passwords to hash', () => {
    const password = 'pass352';
    return passHash(password)
      .then(hashedPassword => {
        return comparePasswords(password, hashedPassword);
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });
});
