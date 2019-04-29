const Customer = require('../../lib/models/Customer');
const mongoose = require('mongoose');

describe('Customer model', () => {
  it('has what we expect', () => {
    const customer = new Customer({
      user: new mongoose.Types.ObjectId(),
      displayName: 'Anna R',
      phoneNumber: '1234567890',
    });

    expect(customer.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      displayName: 'Anna R',
      phoneNumber: '1234567890',
      rewards: 0,
      profilePhoto: 'https://p16.muscdn.com/img/musically-maliva-obj/1629859208383493~c5_720x720.jpeg',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires what we expect', () => {
    const customer = new Customer({
      user: new mongoose.Types.ObjectId(),
      phoneNumber: '234567890',
    });

    const error = customer.validateSync().errors;

    expect(error.phoneNumber.message).toEqual(`Path \`phoneNumber\` is invalid (${customer.phoneNumber}).`);
  });
});
