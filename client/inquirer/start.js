const inquirer = require('inquirer');
const adminMenu = require('./admin/admin-menu');
const customerMenu = require('./customer/customer-menu');
const request = require('superagent');

const signUp = [
  {
    type: 'input',
    name: 'name',
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
      console.log(response);
      switch(response.role) {
        case 'Admin':
          request
            .post('http://localhost:7890/api/v1/auth/signup/admin')
            .send({
              name: response.name,
              role: response.role,
              password: response.password,
              phone: response.phone
            })
            .then(res => console.log(res.body));
          adminMenu();
          break;
        case 'Customer':
          customerMenu();
          break;
      }
    });





const signInPrompt = () => 
  inquirer.prompt(signIn)
    .then(response => {
      console.log(response);
    });

module.exports = { signInPrompt, signUpPrompt };
