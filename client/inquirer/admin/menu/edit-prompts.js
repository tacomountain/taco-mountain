const inquirer = require('inquirer');
const agent = require('../../utils/requester');
const layoutMenu = require('../../utils/layout-menu');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

const REQUEST_URL = require('../../utils/request-url');

const addItemQs = [
  {
    type: 'list',
    name: 'type',
    message: chalkPipe(chance.pickone(colors))('Item type: '),
    choices: [
      {
        name: 'Appetizer',
        value: 'appetizer'
      },
      {
        name: 'Entree',
        value: 'entree'
      },
      {
        name: 'Drink',
        value: 'drink'
      }
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: chalkPipe(chance.pickone(colors))('Name of item:')
  },
  {
    type: 'number',
    name: 'price',
    message: chalkPipe(chance.pickone(colors))('Set price:')
  },
  {
    type: 'number',
    name: 'unitCost',
    message: chalkPipe(chance.pickone(colors))('Unit Cost:')
  },
  {
    type: 'input',
    name: 'image',
    message: chalkPipe(chance.pickone(colors))('Photo Url:')
  },
  {
    type: 'confirm',
    name: 'confirmation',
    message: chalkPipe(chance.pickone(colors))('Add this item to the menu?: ')
  }
];

const addItemPrompt = () => {
  return inquirer.prompt(addItemQs)
    .then(({ type, name, price, unitCost, image, confirmation }) => {
      if(confirmation) {
        return agent()
          .post(`${REQUEST_URL}/food`)
          .send({ name, type, price, unitCost, image });
      }
    })
    .then(() => require('./edit-menu')());
};

const removeItemPrompt = async() => {
  const removeItemQs = [
    {
      type: 'checkbox',
      message: chalkPipe(chance.pickone(colors))('Select items to remove from menu'),
      name: 'remove_items',
      choices: await layoutMenu(),
    },
    {
      type: 'confirm',
      name: 'confirmation',
      message: chalkPipe(chance.pickone(colors))('Would you like to remove these item(s)?')
    }
  ];

  return inquirer.prompt(removeItemQs)
    .then(({ remove_items, confirmation }) => {
      if(confirmation) {
        const idsToDelete = remove_items.map(item => item._id);
        return Promise.all(idsToDelete.map(id => agent().delete(`${REQUEST_URL}/food/${id}`)))
          .then(() => remove_items.map(item => item.name))
          // eslint-disable-next-line no-console
          .then(removedItemNames => console.log(`You've removed ${removedItemNames.join(', ')}.`));
      }
    })
    .then(() => require('./edit-menu')());
};

const updateItemPrompt = async() => {
  const updateItemQs = [
    {
      type: 'list',
      message: chalkPipe(chance.pickone(colors))('Choose an item to update'),
      name: 'update_item',
      choices: await layoutMenu(),
    },
    {
      type: 'checkbox',
      message: chalkPipe(chance.pickone(colors))('Fields to update?'),
      name: 'updateFields',
      choices: [
        {
          name: 'Price',
          value: 'price'
        },
        {
          name: 'Unit Cost',
          value: 'unitCost'
        },
        {
          name: 'Image',
          value: 'image'
        }
      ]
    }
  ];

  return inquirer.prompt(updateItemQs)
    .then(({ update_item, updateFields }) => {
      const updateFieldQs = [
        ...updateFields.map(field => ({
          type: field === 'image' ? 'input' : 'number',
          message: `Update ${field}:`,
          name: field
        })),
        {
          type: 'confirm',
          name: 'confirmation',
          message: 'Would you like to update this item?'
        }
      ];

      return inquirer.prompt(updateFieldQs)
        .then(({ confirmation, ...answers }) => {
          if(confirmation) { 
            return agent()
              .patch(`${REQUEST_URL}/food/${update_item._id}`)
              .send(answers)
              // eslint-disable-next-line no-console
              .then(() => console.log(`You've updated ${update_item.name}.`));
          }
        });
    })
    .then(() => require('./edit-menu')());
};

module.exports = {
  addItemPrompt,
  removeItemPrompt,
  updateItemPrompt
};
