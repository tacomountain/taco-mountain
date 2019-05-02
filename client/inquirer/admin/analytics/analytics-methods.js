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
        console.log(item);
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
        console.log('Item:', item.item.name, '\n\tProfit:', '$' + item.totalProfit.toFixed(2));
      });
    })
    .catch()
    .then(() => require('./analytics')());
}


module.exports = { topRewards, topSpenders, popularItems, profitableItems };
