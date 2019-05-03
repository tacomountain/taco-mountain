const inquirer = require('inquirer');
const adminMenu = require('./admin/admin-menu');
const customerMenu = require('./customer/customer-menu');
const agent = require('./utils/requester');
const chalk = require('chalk');

const REQUEST_URL = require('../utils/request-url');

const signUpQs = [
  {
    type: 'list',
    name: 'role',
    message: 'Choose a role: ',
    choices: [
      {
        name: 'Admin',
        value: 'admin'
      },
      {
        name: 'Customer',
        value: 'customer'
      }
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter your name:',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter your phone number:',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter a password:',
  }
];

const signInQs = [
  {
    type: 'input',
    name: 'phone',
    message: 'Enter your phone number:',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password:',
  }
];

function handleRole(user) {
  switch(user.role) {
    case 'admin':
      return adminMenu();
    case 'customer':
      return customerMenu(user);
  }
}

const signInPrompt = () =>
  inquirer.prompt(signInQs)
    .then(answers => {
      return agent()
        .post(`${REQUEST_URL}/auth/signin`)
        .send(answers)
        .then(res => {
          if(res.body.status === 401) {
            // eslint-disable-next-line no-console
            console.log(chalk.red('Invalid authorization'));
            return require('../client')();
          }
          return handleRole(res.body);
        });
    });
    
const signUpPrompt = () =>
  inquirer.prompt(signUpQs)
    .then(({ role, name, phone, password }) => {
      if(!phone.match(/\d{10}/)) {
        // eslint-disable-next-line no-console
        console.log(chalk.red('Phone number must match regular expression /\\d{10}/'));
        return require('../client')();
      }
      return agent()
        .post(`${REQUEST_URL}/auth/signup/${role}`)
        .send({ name, password, phone })
        .then(res => handleRole(res.body));
    });

module.exports = { signInPrompt, signUpPrompt };
