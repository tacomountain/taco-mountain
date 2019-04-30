require('dotenv').config();
const { getAdminAgent, getCustomerAgent } = require('../utils/data-helper');

describe('food routes', () => {
  it('creates a food', () => {
    return getAdminAgent()
      .post('/api/v1/food')
      .send({
        name: 'Beef Taco',
        price: 2.5,
        type: 'entree',
        unitCost: 0.25,
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Beef Taco',
          price: 2.5,
          type: 'entree',
          unitCost: 0.25,
          image: 'https://creativeconnections.org/wp-content/uploads/2015/07/MEX-14-075-e1437626610793.jpg',
          _id: expect.any(String)
        })
      });
  });
});
