const inquirer = require('inquirer');
const adminMenu = require('./admin-menu');

const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
const tacos = ['Beef', 'Chicken', 'Vegan'];
const dessert = ['Cookies', 'Marg', 'Brownie'];

const editMenu = [
  {
    type: 'list',
    name: 'task',
    message: 'How do you want to edit the menu?',
    choices: ['Add Item', 'Remove Item', 'Update Item', 'Back to Admin']
  }
];

const addMenuItem = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of menu item',
    choices: ['App', 'Entre', 'Dessert', 'Drink']
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name of item'
  },
  {
    type: 'number',
    name: 'price',
    message: 'Set price:'
  },
  {
    type: 'input',
    name: 'image',
    message: 'PhotoUrl'
  },
  {
    type: 'confirm',
    name: 'confirm_order',
    message: 'Add this item to the menu?'
  }
];

const removeItem = [
  {
    type: 'checkbox',
    message: 'select items to remove from menu',
    name: 'remove_items',
    choices: [
      new inquirer.Separator('APPETIZERS'), ...apps,
      new inquirer.Separator('TACOS'), ...tacos,
      new inquirer.Separator('DESSERT'), ...dessert
    ],
  },
  {
    type: 'confirm',
    name: 'confirm_order',
    message: 'Would you like to these item(s)?'
  }
];

const updateItem = [
  {
    type: 'list',
    message: 'Choose an item to update',
    name: 'item_to_update',
    choices: [
      new inquirer.Separator('APPETIZERS'), ...apps,
      new inquirer.Separator('TACOS'), ...tacos,
      new inquirer.Separator('DESSERT'), ...dessert
    ],
  }
];

module.exports = () => inquirer.prompt(editMenu).then(task => {
  switch(task.task) {
    case 'Add Item':
      inquirer.prompt(addMenuItem).then(newItem => {
        console.log(newItem);
      });
      break;
    case 'Remove Item':
      inquirer.prompt(removeItem).then(removedItem => {
        console.log(removedItem);
      });
      break;
    case 'Update Item':
      inquirer.prompt(updateItem).then(updatedItem => {
        console.log(updatedItem);
      });
      break;
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
