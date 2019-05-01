const inquirer = require('inquirer');
const { signInPrompt, signUpPrompt } = require('./inquirer/start');

const startQs = [
  {
    type: 'list',
    name: 'start',
    message: 'Sign in Or Sign Up',
    choices: ['Sign In', 'Sign Up']
  }
];

inquirer.prompt(startQs).then(response => {
  switch(response.start) {
    case 'Sign In': 
      signInPrompt();
      break;
    case 'Sign Up':
      signUpPrompt();
      break;
  }
});
