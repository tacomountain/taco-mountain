const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Customer = require('../../lib/models/Customer');
const Food = require('../../lib/models/Food');
const Order = require('../../lib/models/Order');

function seedUsers(userCount = 20) {
  const users = [...Array(userCount)].map(() => ({
    name: chance.name(),
    password: 'password123',
    phone: chance.phone({ formatted: false }),
    role: 'customer'   
  }));
  return User.create(users);
}

async function seedCustomers(customerCount = 20) {
  const users = await seedUsers();
  const customers = [...Array(customerCount)].map((_, i) => ({
    user: users[i]._id,
    rewards: chance.integer({ min: 0, max: 10 })
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

async function seedOrders(orderCount = 100) {
  const customers = await seedCustomers();
  const food = await seedFood();
  const orders = [...Array(orderCount)].map(() => ({
    customer: chance.pickone(customers)._id,
    food: [
      { foodItem: chance.pickone(food)._id, purchasePrice: chance.pickone(food).price },
      { foodItem: chance.pickone(food)._id, purchasePrice: chance.pickone(food).price },
      { foodItem: chance.pickone(food)._id, purchasePrice: chance.pickone(food).price }
    ],
    subtotal: chance.integer({ min: 1, max: 40 }),
    tip: chance.integer({ min: 0, max: 10 }),
    total: chance.integer({ min: 1, max: 40 })
  }));
  return Order.create(orders);
}

module.exports = seedOrders;
