const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const agent = require('../../requester');

const aggregationQs = [
  {
    type: 'list',
    name: 'aggregation',
    message: 'Find:',
    choices: [
      'Customers with the most rewards',
      'Customers who have spent the most',
      'Most popular menu items',
      'Most profitable menu items',
      'Back to Admin'
    ]
  }
];

module.exports = () => inquirer.prompt(aggregationQs).then(choice => {
  switch(choice.aggregation) {
    case 'Customers with the most rewards':
      return agent()
        .get('http://localhost:7890/api/v1/customers/topRewards')
        .then(res => res.body)
        .then(customers => {
          customers.forEach(customer => {
            console.log('\t', customer.name + ':', customer.rewards, 'points');
          });
        });
    case 'Customers who have spent the most':
      return agent()
        .get('http://localhost:7890/api/v1/customers/topSpenders')
        .then(res => res.body)
        .then(customers => {
          customers.forEach(customer => {
            console.log(customer._id.name + ':', '\n\t\t$' + customer.totalSpent);
          });
        });
    case 'Most popular menu items':
      return agent()
        .get('http://localhost:7890/api/v1/orders/topMenuItems')
        .then(res => res.body)
        .then(items => {
          items.forEach(item => {
            // eslint-disable-next-line no-console
            console.log(item);
          });
        })
        .catch();
    case 'Most profitable menu items':
      return agent()
        .get('http://localhost:7890/api/v1/orders/profitsByFood')
        .then(res => res.body)
        .then(items => {
          items.forEach(item => {
            // eslint-disable-next-line no-console
            console.log('Item:', item.item.name, '\n\tProfit:', '$' + item.totalProfit.toFixed(2));
          });
        })
        .catch();
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
