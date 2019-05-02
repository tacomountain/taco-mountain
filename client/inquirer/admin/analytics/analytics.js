const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const agent = require('../../utils/requester');
const { topRewards, topSpenders, popularItems, profitableItems } = require('./analytics-methods');

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
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
