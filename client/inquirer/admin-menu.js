const inquirer = require('inquirer');
const editMenu = require('./edit-menu');
const analytics = require('./analytics');

var adminTasks = [
  {
    type: 'list',
    name: 'adminTask',
    message: 'Choose a password?',
    choices: ['Edit Menu', 'Analytics']
  }
];


module.exports = () => inquirer.prompt(adminTasks).then(task => {
  switch(task.adminTasks) {
    case 'Edit Menu':
      editMenu();
      break;
    case 'Analytics':
      analytics();
      break;
  }
});
