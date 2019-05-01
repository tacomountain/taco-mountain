const inquirer = require('inquirer');

var adminTasks = [
  {
    type: 'list',
    name: 'adminTask',
    message: 'What will you do?',
    choices: ['Edit Menu', 'Analytics']
  }
];

module.exports = () => inquirer.prompt(adminTasks).then(task => {
  switch(task.adminTask) {
    case 'Edit Menu':
      require('./menu/edit-menu')();
      break;
    case 'Analytics':
      require('./analytics/analytics')();
      break;
  }
});

