/* eslint-disable no-console */
const chalk = require('chalk');
const agent = require('../../utils/requester');

const REQUEST_URL = require('../../utils/request-url');

function topRewards() {
  return agent()
    .get(`${REQUEST_URL}/customers/topRewards`)
    .then(res => res.body)
    .then(customers => {
      customers.forEach(customer => {
        console.log('\t', customer.name + ':', chalk.yellow(customer.rewards), chalk.yellow('points'));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function topSpenders() {
  return agent()
    .get(`${REQUEST_URL}/customers/topSpenders`)
    .then(res => res.body)
    .then(customers => {
      customers.forEach(customer => {
        console.log(customer._id.name + ':', chalk.blue('\n\t\t$') + chalk.blue.bold(customer.totalSpent.toFixed(2)));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function popularItems() {
  return agent()
    .get(`${REQUEST_URL}/orders/topMenuItems`)
    .then(res => res.body)
    .then(items => {
      items.forEach(item => {
        console.log(chalk.yellow(item.name), '\n\t\tPrice: $' + item.price, '\tSold:', item.purchased);
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitableItems() {
  return agent()
    .get(`${REQUEST_URL}/orders/profitsByFood`)
    .then(res => res.body)
    .then(items => {
      items.forEach(item => {
        console.log(chalk.blue(item.item.name), '\n\t\tProfit:', '$' + item.totalProfit.toFixed(2));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function totalSales() {
  return agent()
    .get(`${REQUEST_URL}/orders/totalSales`)
    .then(res => res.body)
    .then(sales => {
      console.log(chalk.bold.red('\t\t$' + sales[0].total.toFixed(2)));
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitMargin() {
  return agent()
    .get(`${REQUEST_URL}/orders/totalProfitMargin`)
    .then(res => res.body)
    .then(margin => {
      console.log(chalk.bold.blue('\t\t$' + margin.profit));
    })
    .catch()
    .then(() => require('./analytics')());
}

function getOrders() {
  return agent()
    .get(`${REQUEST_URL}/orders`)
    .then(res => res.body)
    .then(orders => {
      for(let i = orders.length - 5; i < orders.length; i++) {
        const order = orders[i];
        console.log('\n' + chalk.bold.yellow(order.customer.user.name), 
          ' - Phone:', order.customer.user.phone,
          '\n\tItems Ordered:');
        order.food.forEach(item => {
          console.log('\t' + item.name, '\t$' + item.purchasePrice.toFixed(2));
        });
        console.log('  Tip: $' + order.tip);
        console.log(chalk.bold('  Total: $' + order.total.toFixed(2)));
      }
    })
    .catch()
    .then(() => require('./analytics')());
}

module.exports = {
  topRewards,
  topSpenders,
  popularItems,
  profitableItems,
  totalSales,
  profitMargin,
  getOrders
};
