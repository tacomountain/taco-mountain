const inquirer = require('inquirer');
const adminMenu = require('./admin/admin-menu');
const customerMenu = require('./customer/customer-menu');
const agent = require('./utils/requester');
const chalk = require('chalk');
const chalkPipe = require('chalk-pipe');
const chance = require('chance');


chance.pickOne['#dd8080', '#ffac63', '#fce95d']
const header = chalkPipe()


const signUpQs = [
  {
    type: 'list',
    name: 'role',
    message: '\n\n' + chalk.magenta('Choose a role:'),
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
    message: 'Enter your name',
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

const signInQs = [
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
    .then(answers => 
      agent()
        .post('http://localhost:7890/api/v1/auth/signin')
        .send(answers)
        .then(res => {
          if(res.body.status === 401) {
            // eslint-disable-next-line no-console
            console.log(chalk.red('invalid authorization'));
            require('../client')();
          }
          handleRole(res.body);
        })
    );
    
const signUpPrompt = () =>
  inquirer.prompt(signUpQs)
    .then(({ role, name, phone, password }) =>
    {
      if(!phone.match(/\d{10}/)) {
        console.log(chalk.red('Phone number must match regular expression /\\d{10}/'));
        return require('../client')();
      }
      agent()
        .post(`http://localhost:7890/api/v1/auth/signup/${role}`)
        .send({ name, password, phone })
        .then(res => handleRole(res.body));
    }
    );

module.exports = { signInPrompt, signUpPrompt };
