const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const {
  topRewards,
  topSpenders,
  popularItems,
  profitableItems,
  totalSales,
  profitMargin,
  getOrders
} = require('./analytics-methods');

const aggregationQs = [
  {
    type: 'list',
    name: 'aggregation',
    message: 'Find:',
    choices: [
      'Customers with the most rewards',
      'Customers who have spent the most',
      'Get most recent orders',
      'Most popular menu items',
      'Most profitable menu items',
      'Total Sales',
      'Profit Margin on Menu Items',
      'Back to Admin'
    ]
  }
];

module.exports = () => inquirer.prompt(aggregationQs).then(choice => {
  switch(choice.aggregation) {
    case 'Customers with the most rewards':
      return topRewards();
    case 'Customers who have spent the most':
      return topSpenders();
    case 'Most popular menu items':
      return popularItems();
    case 'Most profitable menu items':
      return profitableItems();
    case 'Total Sales':
      return totalSales();
    case 'Profit Margin on Menu Items':
      return profitMargin();
    case 'Get most recent orders':
      return getOrders();
    case 'Back to Admin':
      return adminMenu();
  }
});
