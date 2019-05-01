require('dotenv').config();
const { getCustomerAgent, getFood } = require('../utils/data-helper');

describe('order routes', () => {
  it('can create an order', async() => {
    const [food1, food2, food3] = await Promise.all([getFood(), getFood(), getFood()]);
    const res = await getCustomerAgent()
      .post('/api/v1/orders')
      .send({
        food: [
          {
            foodItem: food1._id,
            purchasePrice: food1.price
          },
          {
            foodItem: food2._id,
            purchasePrice: food2.price
          },
          {
            foodItem: food3._id,
            purchasePrice: food3.price
          }
        ],
        subtotal: food1.price + food2.price + food3.price,
        tip: 2,
        get total() {
          return this.subtotal + this.tip;
        }
      });
    expect(res.body.order).toEqual({
      _id: expect.any(String),
      customer: expect.any(String),
      food: [{
        foodItem: food1._id,
        purchasePrice: food1.price
      },
      {
        foodItem: food2._id,
        purchasePrice: food2.price
      },
      {
        foodItem: food3._id,
        purchasePrice: food3.price
      }],
      subtotal: food1.price + food2.price + food3.price,
      tip: 2,
      get total() {
        return this.subtotal + this.tip;
      },
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
    expect(res.body.customerRewards).toEqual({
      _id: res.body.order.customer,
      rewards: 1
    });
  });
});
