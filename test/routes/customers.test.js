const { getAdminAgent } = require('../utils/data-helper');

describe('aggregations', () => {
  it('get top 10 customers', () => {
    return getAdminAgent()
      .get('/api/v1/customers/topRewards')
      .then(res => {
        expect(res.body).toHaveLength(10); 
        expect(res.body[0].rewards).toBeGreaterThanOrEqual(res.body[1].rewards);
      });
  });
});
