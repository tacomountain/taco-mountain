// sometimes its nice to have services that handle
// database transactions. This is especially true
// when creating a new document triggers other things
// to happen.
// This helps remove logic from your routes and keeps them simple
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { sendMessage } = require('./twilio');
// publish events from service
const EventEmitter = require('events');

const orderEvents = new EventEmitter();

const create = async({ food, subtotal, tip, total, user }) => {
  const customer = user.profile._id;
  const phoneNumber = user.phone;

  // Can use the $inc operator to increment a field. Simplifies the logic a bit
  const customerRewards = await Customer
    .findByIdAndUpdate(customer, { $inc: { rewards: 1 } }, { new: true })
    .select({ rewards: true })
    .lean();

  const order = await Order
    .create({ customer, food, subtotal, tip, total });

  let textImage = 'https://thumbs.dreamstime.com/z/eating-tacos-1457310.jpg';
  if(customerRewards.rewards >= 2) {
    textImage = 'http://i64.tinypic.com/2z4copf.jpg';
  }

  const foodList = order.food.map(item => {
    return item.name;
  });

  sendMessage(
    phoneNumber,
    `You ordered ${foodList.join(', ')}, for $${order.total}. And now you have ${customerRewards.rewards} reward points!`,
    textImage,
  );

  // just for fun
  orderEvents.emit('new_order', order);

  return { order, customerRewards };
};

const profitMargin = async() => {
  const cost = await Order.totalCost();
  const sales = await Order.totalSales();
  return (sales[0].total - cost[0].totalCost).toFixed(2);
};

module.exports = {
  orderEvents,
  create,
  profitMargin
};
