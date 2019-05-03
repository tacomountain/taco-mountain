const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

var adminTasks = [
  {
    type: 'list',
    name: 'task',
    message: chalkPipe(chance.pickone(colors))('What will you do?'),
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
      // eslint-disable-next-line no-console
      return console.log('You are signed out.');
  }
});
