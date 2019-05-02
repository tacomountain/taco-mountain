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
        expect(res.body).toHaveLength(15);
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

  it('patches a food by id', () => {
    return getFood()
      .then(food => {
        return getAdminAgent()
          .patch(`/api/v1/food/${food._id}`)
          .send({
            name: 'Horchata Taco',
            price: 4.45,
            unitCost: 1,
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'Horchata Taco',
              price: 4.45,
              unitCost: 1,
              type: food.type, 
              image: food.image,
              _id: expect.any(String)
            });
          });
      });
  });

  it('cen delete a food', () => {
    return getFood()
      .then(food => {
        return getAdminAgent()
          .delete(`/api/v1/food/${food._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          price: expect.any(Number),
          unitCost: expect.any(Number),
          type: expect.any(String), 
          image: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  
});
