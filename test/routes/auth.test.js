const { getUser } = require('../utils/data-helper');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth route tests', () => {

  it('signs up an admin', () => {
    return request(app)
      .post('/api/v1/auth/signup/admin')
      .send({ name: 'taco dan', password: 'sneakyPhrase32', phone: '2345678901' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'taco dan', 
          role: 'admin',
          phone: '2345678901',
          _id: expect.any(String),
          profile: null
        });
      });
  });

  it('signs up a customer', () => {
    return request(app)
      .post('/api/v1/auth/signup/customer')
      .send({ name: 'customer dan', password: 'letMeIn', phone: '8888888888' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'customer dan',
          phone: '8888888888',
          role: 'customer',
          _id: expect.any(String),
          profile: {
            _id: expect.any(String),
            rewards: 0
          }
        });
      });
  });

  it('signs in a customer', () => {
    return getUser()
      .then(newUser => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ phone: newUser.phone, password: 'password123' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          _id: expect.any(String),
          profile: {
            _id: expect.any(String),
            rewards: 0
          },
          phone: expect.any(String),
          role: 'customer'
        });
      });
  });

  it('signs in an admin', () => {
    return request(app)
      .post('/api/v1/auth/signup/admin')
      .send({ name: 'taco dan', password: 'sneakyPhrase32', phone: '2345678901' })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ phone: '2345678901', password: 'sneakyPhrase32' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'taco dan',
          _id: expect.any(String),
          profile: null,
          phone: '2345678901',
          role: 'admin'
        });
      });
  });

  it('errors on signin with non existing acc', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ phone: '2345678901', password: 'sneakyPhrase32' })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Invalid login'
        });
      });
  });

  it('errors on signin with bad password', () => {
    return getUser()
      .then(newUser => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ phone: newUser.phone, password: 'password12' });
      })
      .then(res => {
        expect(res.body).toEqual({
          error: 'Invalid login'
        });
      });
  });

});
