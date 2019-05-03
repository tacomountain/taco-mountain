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
    choices: ['Add Item', 'Remove Item', 'Update Item', 'Back to Admin']
  }
];

module.exports = () => inquirer.prompt(editMenuQs).then(task => {
  switch(task.task) {
    case 'Add Item':
      addItemPrompt();
      break;
    case 'Remove Item':
      removeItemPrompt();
      break;
    case 'Update Item':
      updateItemPrompt();
      break;
    case 'Back to Admin':
      adminMenu();
      break;
  }
});
