require('dotenv').config();
const { getCustomerAgent, getAdminAgent, getFood } = require('../utils/data-helper');

describe('order routes', () => {
  it('can create an order', async() => {
    const [food1, food2, food3] = await Promise.all([getFood(), getFood(), getFood()]);
    const res = await getCustomerAgent()
      .post('/api/v1/orders')
      .send({
        food: [
          {
            foodId: food1._id,
            name: food1.name,
            purchasePrice: food1.price
          },
          {
            foodId: food2._id,
            name: food2.name,
            purchasePrice: food2.price
          },
          {
            foodId: food3._id,
            name: food3.name,
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
        foodId: food1._id,
        name: food1.name,
        purchasePrice: food1.price
      },
      {
        foodId: food2._id,
        name: food2.name,
        purchasePrice: food2.price
      },
      {
        foodId: food3._id,
        name: food3.name,
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

  it('gets all orders', () => {
    return getAdminAgent()
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });


  it('gets total sales', () => {
    return getAdminAgent()
      .get('/api/v1/orders/totalSales')
      .then(res => {
        expect(res.body).toEqual([{
          total: expect.any(Number)
        }]);
      });
  });

  it('gets total profit margin', () => {
    return getAdminAgent()
      .get('/api/v1/orders/totalProfitMargin')
      .then(res => {
        expect(res.body).toEqual({
          profit: expect.any(String)
        });
      });
  });
  it('gets a list of profits by food item', () => {
    return getAdminAgent()
      .get('/api/v1/orders/profitsByFood')
      .then(res => {
        for(let i = 0; i < res.body.length - 1; i++) {
          expect(res.body[i]).toEqual({
            totalSale: expect.any(Number),
            count: expect.any(Number),
            totalProfit: expect.any(Number),
            item: {
              _id: expect.any(String),
              name: expect.any(String),
              price: expect.any(Number),
              type: expect.any(String),
              unitCost: expect.any(Number),
              image: expect.any(String)
            }
          });
          expect(res.body[i].totalProfit).toBeGreaterThanOrEqual(res.body[i + 1].totalProfit);
        }
      });
  });
  it('gets top ten menu items', () => {
    return getAdminAgent()
      .get('/api/v1/orders/topMenuItems')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });
});
