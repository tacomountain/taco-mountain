const mongoose = require('mongoose');
const User = require('../../lib/models/User');
require('../utils/data-helper');

describe('user', () => {
  it('hashes the password at user creation', () => {
    User.create({
      username: 'beeftaco69',
      password: 'pw1234',
      role: 'admin'
    })
      .then(user => {
        expect(user).toEqual({
          username: 'beeftaco69',
          role: 'admin',
          _id: expect.any(mongoose.Types.ObjectId),
          passwordHash: expect.any(String)
        });
      });
  });
});
