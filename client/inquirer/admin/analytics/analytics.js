const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const { topRewards, topSpenders, popularItems, profitableItems, totalSales } = require('./analytics-methods');

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
      'Total Sales',
      'Back to Admin'
    ]
  }
];

module.exports = () => inquirer.prompt(aggregationQs).then(choice => {
  switch(choice.aggregation) {
    case 'Customers with the most rewards':
      topRewards();
      break;
    case 'Customers who have spent the most':
      topSpenders();
      break;
    case 'Most popular menu items':
      popularItems();
      break;
    case 'Most profitable menu items':
      profitableItems();
      break;
    case 'Total Sales':
      totalSales();
      break;
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
