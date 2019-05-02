const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const { topRewards, topSpenders, popularItems, profitableItems, totalSales, profitMargin, profitByFood, getOrders } = require('./analytics-methods');

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
      'Total Profit Margin on Menu Items',
      'Profit by Menu Item',
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
    case 'Total Profit Margin on Menu Items':
      profitMargin();
      break;
    case 'Profit by Menu Item':
      profitByFood();
      break;
    case 'Get most recent orders':
      getOrders();
      break;
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
