const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();
const { topRewards, topSpenders, popularItems, profitableItems, totalSales, profitMargin, profitByFood, getOrders } = require('./analytics-methods');

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

const aggregationQs = [
  {
    type: 'list',
    name: 'aggregation',
    message: chalkPipe(chance.pickone(colors))('Find: '),
    choices: [
      'Customers with the most rewards',
      'Customers who have spent the most',
      'Get most recent orders',
      'Most popular menu items',
      'Most profitable menu items',
      'Total Sales',
      'Total Profit Margin on Menu Items',
      'Profit by Menu Item',
      chalkPipe('yellow')('Back to Admin')
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
