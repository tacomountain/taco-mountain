const inquirer = require('inquirer');

const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
const tacos = ['Beef', 'Chicken', 'Vegan'];
const dessert = ['Cookies', 'Marg', 'Brownie'];



const addMenuItemQs = [
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

const removeMenuItemQs = [
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

const updateMenuItemQs = [
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

const addItemPrompt = () => inquirer.prompt(addMenuItemQs).then(newItem => {
  console.log(newItem);
  require('./edit-menu')();
});

const removeItemPrompt = () => inquirer.prompt(removeMenuItemQs).then(newItem => {
  console.log(newItem);
  require('./edit-menu')();
});

const updateItemPrompt = () => inquirer.prompt(updateMenuItemQs).then(newItem => {
  console.log(newItem);
  require('./edit-menu')();
});

module.exports = {
  addItemPrompt,
  removeItemPrompt,
  updateItemPrompt
};
