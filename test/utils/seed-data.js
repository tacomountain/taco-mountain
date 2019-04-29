const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Customer = require('../../lib/models/Customer');

function seedUsers(userCount = 10) {
  const users = [...Array(userCount)].map(() => ({
    name: chance.name(),
    password: chance.animal(),
    phone: chance.phone({ formatted: false }),
    role: 'customer'   
  }));
  return User.create(users);
}

async function seedCustomers(customerCount = 10) {
  const users = await seedUsers();
  const customers = [...Array(customerCount)].map((_, i) => ({
    user: users[i]._id
  }));
  return Customer.create(customers);
}

module.exports = seedCustomers;

