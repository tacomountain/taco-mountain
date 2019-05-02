const agent = require('../../requester');

function topRewards() {
  return agent()
    .get('http://localhost:7890/api/v1/customers/topRewards')
    .then(res => res.body)
    .then(customers => {
      customers.forEach(customer => {
        console.log('\t', customer.name + ':', customer.rewards, 'points');
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
        console.log(customer._id.name + ':', '\n\t\t$' + customer.totalSpent);
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
        console.log(item.name, '\n\t\tPrice: $' + item.price, '\tSold:', item.purchased);
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
        console.log(item.item.name, '\n\t\tProfit:', '$' + item.totalProfit.toFixed(2));
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
      console.log('\t\t$' + sales[0].total);
    })
    .catch()
    .then(() => require('./analytics')());
}

function profitMargin() {
  return agent()
    .get('http://localhost:7890/api/v1/orders/totalProfitMargin')
    .then(res => res.body)
    .then(margin => {
      console.log('\t\t$' + margin.profit);
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
        console.log(food.item.name, '\n\t\tProfit Earned: $' + food.totalProfit.toFixed(2));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}

module.exports = { topRewards, topSpenders, popularItems, profitableItems, totalSales, profitMargin, profitByFood };
