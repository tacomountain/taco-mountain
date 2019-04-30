require('dotenv').config();
const { getAdminAgent, getFood } = require('../utils/data-helper');


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
        });
      });
  });

  it('gets a list of food', () => {
    return getAdminAgent()
      .get('/api/v1/food')
      .then(res => {
        expect(res.body).toHaveLength(20);
      });
  });

  it('gets a food by id', () => {
    return getFood()
      .then(food => {
        return getAdminAgent()
          .get(`/api/v1/food/${food._id}`)
          .then(res => {
            expect(res.body).toEqual(food);
          });
      });
  });


  
});
