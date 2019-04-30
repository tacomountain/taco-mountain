var inquirer = require('inquirer');
var chalkPipe = require('chalk-pipe');

var signInSignUp = [
  {
    type: 'list',
    name: 'signInSignUp',
    message: 'Sign in Or Sign Up',
    choices: ['Admin', new inquirer.Separator(), 'Customer']
  }
];

var signUp = [
  {
    type: 'input',
    name: 'Name',
    message: 'Enter your name',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter your phone numner - ex: 1111111111',
  },
  {
    type: 'list',
    name: 'role',
    message: 'Choose a password?',
    choices: ['Admin', new inquirer.Separator(), 'Customer']
  },
  {
    type: 'input',
    name: 'password',
    message: 'Choose a password?',
  }
];

var signin = [
  {
    type: 'input',
    name: 'phone',
    message: 'Phone number?',
  },
  {
    type: 'input',
    name: 'password',
    message: 'Password?',
  }
];

//****** Customer stuff  *********
//****** Customer stuff  *********
//****** Customer stuff  *********
//****** Customer stuff  *********

// populate a list with aggrigation
const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
const tacos = ['Beef', 'Chicken', 'Vegan'];
const dessert = ['Cookies', 'Marg', 'Brownie'];

var order = [
  {
    type: 'checkbox',
    message: 'select food',
    name: 'food',
    choices: [
      new inquirer.Separator('APPETIZERS'), ...apps,
      new inquirer.Separator('TACOS'), ...tacos,
      new inquirer.Separator('DESSERT'), ...dessert
    ],
  },
  {
    type: 'input',
    name: 'tip',
    message: 'How much would you like to tip'
  },
  {
    type: 'confirm',
    name: 'confirm_order',
    message: 'Would you like to place this order?'
  }
];



// ****** ADMIN STUFF *****
// ****** ADMIN STUFF *****
// ****** ADMIN STUFF *****
// ****** ADMIN STUFF *****



var adminChoices = [
  {
    type: 'list',
    name: 'role',
    message: 'Choose a password?',
    choices: ['Edit Menu', 'Analytics']
  }
];



var editMenu = [
  {
    type: 'list',
    name: 'how_to_edit',
    message: 'What do you want to edit the menu?',
    choices: ['Add Item', 'Remove Menu Item', 'Update Menu Item', 'Back to Admin']
  }
];

var addMenuItem = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of menu item',
    choices: ['App', 'Entre', 'Dessert']
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name of item'
  },
  {
    type: 'input',
    name: 'price',
    message: 'How much to charge?'
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

var removeItem = [
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

var updateItem = [
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


var analytics = [
  {
    type: 'list',
    name: 'analytics',
    message: 'Would information would you like to see?',
    choices: ['Top customers', 'Most sold menu items', 'Profit for last week', 'Done']
  },
];


inquirer.prompt(signin).then(user => {
  if(user.user_type === 'Customer') {
    inquirer.prompt(order).then(order => {
      console.log(JSON.stringify(order, null, '  '));
    });
  } else { console.log('thanks');}
  
});
