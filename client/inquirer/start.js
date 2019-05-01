const inquirer = require('inquirer');
const adminMenu = require('./admin-menu');
const customerMenu = require('./customer-menu');

const signUp = [
  {
    type: 'input',
    name: 'Name',
    message: 'Enter your name',
  },
  {
    type: 'list',
    name: 'role',
    message: 'Choose a role:',
    choices: ['Admin', 'Customer']
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter your phone number',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Choose a password',
  }
];

const signIn = [
  {
    type: 'input',
    name: 'phone',
    message: 'Phone number',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password',
  }
];

const signUpPrompt = () => 
  inquirer.prompt(signUp)
    .then(response => {
      switch(response.role) {
        case 'Admin':
          adminMenu();
          break;
        case 'Customer':
          customerMenu();
          break;
      }
      console.log(response);
    });





const signInPrompt = () => 
  inquirer.prompt(signIn)
    .then(response => {
      console.log(response);
    });

module.exports = { signInPrompt, signUpPrompt };
