require('../utils/data-helper');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth route tests', () => {

  it('signs up an admin', () => {
    return request(app)
      .post('/api/v1/auth/signup/admin')
      .send({ username: 'taco dan', password: 'sneakyPhrase32' })
      .then(res => {
        console.log(res.headers['set-cookie'][0])
        expect(res.body).toEqual({
          username: 'taco dan', 
          role: 'admin',
          _id: expect.any(String)
        });
      });
  });

  it('signs up a customer', () => {
    return request(app)
      .post('/api/v1/auth/signup/customer')
      .send({ username: 'customer dan', displayName: 'display Name', password: 'customerPassword', phoneNumber: '8888888888' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          displayName: 'display Name',
          phoneNumber: '8888888888',
          rewards: 0,
          profilePhoto: 'https://p16.muscdn.com/img/musically-maliva-obj/1629859208383493~c5_720x720.jpeg'
        });
      });
  });

  it('signs in a user', () => {
    
  });

});
