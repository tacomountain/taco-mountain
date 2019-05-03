const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const { addItemPrompt, removeItemPrompt, updateItemPrompt } = require('./edit-prompts');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

const editMenuQs = [
  {
    type: 'list',
    name: 'task',
    message: chalkPipe(chance.pickone(colors))('How do you want to edit the menu?'),
    choices: ['Add Item', 'Remove Item', 'Update Item', chalkPipe('yellow')('Back to Admin')]
  }
];

module.exports = () => inquirer.prompt(editMenuQs).then(({ task }) => {
  switch(task) {
    case 'Add Item':
      return addItemPrompt();
    case 'Remove Item':
      return removeItemPrompt();
    case 'Update Item':
      return updateItemPrompt();
    case chalkPipe('yellow')('Back to Admin'):
      return adminMenu();
  }
});
