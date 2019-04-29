const Customer = require('../../lib/models/Customer');
const mongoose = require('mongoose');

describe('Customer model', () => {
  it('has what we expect', () => {
    const customer = new Customer({
      user: new mongoose.Types.ObjectId(),
    });

    expect(customer.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      rewards: 0,
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
