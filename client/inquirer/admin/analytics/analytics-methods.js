/* eslint-disable no-console */
const agent = require('../../requester');
const chalk = require('chalk');

function topRewards() {
  return agent()
    .get('http://localhost:7890/api/v1/customers/topRewards')
    .then(res => res.body)
    .then(customers => {
      customers.forEach(customer => {
        console.log('\t', customer.name + ':', chalk.yellow(customer.rewards), chalk.yellow('points'));
      });
    })
    .then(() => require('./analytics')());
}

function topSpenders() {
  return agent()
    .get('http://localhost:7890/api/v1/customers/topSpenders')
    .then(res => res.body)
    .then(customers => {
      customers.forEach(customer => {
        console.log(customer._id.name + ':', chalk.blue('\n\t\t$') + chalk.blue.bold(customer.totalSpent));
      });
    })
    .then(() => require('./analytics')());
}

function popularItems() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/topMenuItems')
    .then(res => res.body)
    .then(items => {
      items.forEach(item => {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow(item.name), '\n\t\tPrice: $' + item.price, '\tSold:', item.purchased);
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitableItems() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/profitsByFood')
    .then(res => res.body)
    .then(items => {
      items.forEach(item => {
        // eslint-disable-next-line no-console
        console.log(chalk.blue(item.item.name), '\n\t\tProfit:', '$' + item.totalProfit.toFixed(2));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function totalSales() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/totalSales')
    .then(res => res.body)
    .then(sales => {
      console.log(chalk.bold.red('\t\t$' + sales[0].total));
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitMargin() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/totalProfitMargin')
    .then(res => res.body)
    .then(margin => {
      console.log(chalk.bold.blue('\t\t$' + margin.profit));
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitByFood() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/profitsByFood')
    .then(res => res.body)
    .then(foods => {
      foods.forEach(food => {
        console.log(chalk.bold(food.item.name), '\n\t\tProfit Earned: $' + food.totalProfit.toFixed(2));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

function getOrders() {
  return agent()
    .get('http://localhost:7890/api/v1/orders')
    .then(res => res.body)
    .then(orders => {
      for(let i = 0; i < 6; i++) {
        const order = orders[i];
        console.log('\n' + chalk.bold.yellow(order.customer.user.name), 
          ' - Phone:', order.customer.user.phone,
          '\n\tItems Ordered:');
        order.food.forEach(item => {
          console.log('\t' + item.foodItem.name, '\t$' + item.purchasePrice);
        });
        console.log('  Tip: $' + order.tip);
        console.log(chalk.bold('  Total: $' + order.total));
      }
    })
    .catch()
    .then(() => require('./analytics')());
}

module.exports = { topRewards, topSpenders, popularItems, profitableItems, totalSales, profitMargin, profitByFood, getOrders };
