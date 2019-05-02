const inquirer = require('inquirer');
const request = require('superagent');
const agent = require('../../requester');

const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
const tacos = ['Beef', 'Chicken', 'Vegan'];
const dessert = ['Cookies', 'Marg', 'Brownie'];


const addMenuItemQs = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of menu item',
    choices: ['appetizer', 'Entre', 'Dessert', 'Drink']
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
    type: 'number',
    name: 'unitCost',
    message: 'Unit Cost'
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
    message: 'Select items to remove from menu',
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
    message: 'Would you like to remove these item(s)?'
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

const addItemPrompt = () => inquirer.prompt(addMenuItemQs).then(({ type, name, price, unitCost, image, confirm_order }) => {
  if(confirm_order) {
    return agent()
      .post('http://localhost:7890/api/v1/food')
      .send({ name, type, price, unitCost, image })
      .then(() => {
        require('./edit-menu')();})
      .catch();
  } else {
    require('./edit-menu')();
  }
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
