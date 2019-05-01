const inquirer = require('inquirer');
const adminMenu = require('../admin-menu');
const { addItemPrompt, removeItemPrompt, updateItemPrompt } = require('./edit-prompts');

const editMenuQs = [
  {
    type: 'list',
    name: 'task',
    message: 'How do you want to edit the menu?',
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
