const mongoose = require('mongoose');
const User = require('../../lib/models/User');
require('../utils/data-helper');

describe('user', () => {
  
  it('hashes the password at user creation', () => {
    return User.create({
      name: 'beef taco 69',
      password: 'pw1234',
      phone: '1234567890',
      role: 'admin'
    })
      .then(user => {
        expect(user.toJSON()).toEqual({
          name: 'beef taco 69',
          role: 'admin',
          phone: '1234567890',
          _id: expect.any(mongoose.Types.ObjectId),
        });
      });
  });

});
