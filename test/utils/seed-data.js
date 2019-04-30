const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Customer = require('../../lib/models/Customer');
const Food = require('../../lib/models/Food');

function seedUsers(userCount = 10) {
  const users = [...Array(userCount)].map(() => ({
    name: chance.name(),
    password: 'password123',
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

function seedFood(foodCount = 20) {
  const food = [...Array(foodCount)].map(() => ({
    name: `${chance.animal()} Taco`,
    price: chance.floating({ min: 0.5, max: 10, fixed: 3 }),
    type: chance.pickone(['appetizer', 'entree', 'dessert', 'drink']),
    unitCost: chance.floating({ min: 0.5, max: 6, fixed: 3 }),
    image: chance.avatar()
  }));
  return Food.create(food);
}

module.exports = () => {
  seedCustomers();
  seedFood();
};

