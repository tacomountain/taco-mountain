const inquirer = require('inquirer');
const { signInPrompt, signUpPrompt } = require('./inquirer/start');
const figlet = require('figlet');
const gradient = require('gradient-string');





const startQs = [
  {
    type: 'list',
    name: 'start',
    message: '\n\n\n' + gradient.pastel(figlet.textSync('Taco Mountain', { font: 'big' })) + '\n',
    choices: ['Sign In', 'Sign Up']
  }
];

const client = () => inquirer.prompt(startQs).then(response => {
  switch(response.start) {
    case 'Sign In': 
      signInPrompt();
      break;
    case 'Sign Up':
      signUpPrompt();
      break;
  }
});

module.exports = client;
