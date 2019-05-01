const { getAdminAgent } = require('../utils/data-helper');

describe('aggregations', () => {

  it('get top 10 customers (rewards)', () => {
    return getAdminAgent()
      .get('/api/v1/customers/topRewards')
      .then(res => {
        expect(res.body).toHaveLength(10); 
        expect(res.body[0].rewards).toBeGreaterThanOrEqual(res.body[1].rewards);
      });
  });

  it('gets the top ten spending customers', () => {
    return getAdminAgent()
      .get('/api/v1/customers/topSpenders')
      .then(res => {
        expect(res.body).toHaveLength(10); 
        expect(res.body[0].totalSpent).toBeGreaterThanOrEqual(res.body[1].totalSpent);
        expect(res.body[0]).toEqual({
          _id: {
            _id: expect.any(String),
            name: expect.any(String),
            phone: expect.any(String)
          },
          totalSpent: expect.any(Number)
        });
      });
  });

});
