const inquirer = require('inquirer');

var adminTasks = [
  {
    type: 'list',
    name: 'task',
    message: 'What will you do?',
    choices: ['Edit Menu', 'Analytics', 'Sign Out']
  }
];

module.exports = () => inquirer.prompt(adminTasks).then(({ task }) => {
  switch(task) {
    case 'Edit Menu':
      return require('./menu/edit-menu')();
    case 'Analytics':
      return require('./analytics/analytics')();
    case 'Sign Out':
      return console.log('You are signed out.');
  }
});
