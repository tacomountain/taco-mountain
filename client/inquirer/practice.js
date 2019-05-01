var inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'signInSignUp',
    message: 'Sign in Or Sign Up',
    choices: [
      {
        name: 'Taco',
        value: {
          name: 'Taco',
          price: 2
        }
      },
      {
        name: 'Taco2',
        value: {
          name: 'Taco2',
          price: 3
        }
      },
    ]
  }
];

inquirer.prompt(questions)
  .then(answers => {
    console.log(answers);
  });
