const inquirer = require('inquirer');
const agent = require('../../utils/requester');
const layoutMenu = require('../../utils/layout-menu');

const REQUEST_URL = 'http://localhost:7890/api/v1/food';

const addItemQs = [
  {
    type: 'list',
    name: 'type',
    message: 'What type  item',
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
    message: 'Name of item'
  },
  {
    type: 'number',
    name: 'price',
    message: 'Set price:'
  },
  {
    type: 'number',
    name: 'unitCost',
    message: 'Unit Cost'
  },
  {
    type: 'input',
    name: 'image',
    message: 'Photo Url'
  },
  {
    type: 'confirm',
    name: 'confirmation',
    message: 'Add this item to the menu?'
  }
];

const addItemPrompt = () => inquirer.prompt(addItemQs).then(({ type, name, price, unitCost, image, confirmation }) => {
  if(confirmation) {
    return agent()
      .post(REQUEST_URL)
      .send({ name, type, price, unitCost, image })
      .then(() => require('./edit-menu')())
      .catch();
  } else return require('./edit-menu')();
});

const removeItemPrompt = async() => {
  const removeItemQs = [
    {
      type: 'checkbox',
      message: 'Select items to remove from menu',
      name: 'remove_items',
      choices: await layoutMenu(),
    },
    {
      type: 'confirm',
      name: 'confirm_order',
      message: 'Would you like to remove these item(s)?'
    }
  ];

  return inquirer.prompt(removeItemQs)
    .then(({ remove_items }) => {
      const idsToDelete = remove_items.map(item => item._id);
      return Promise.all(idsToDelete.map(id => agent().delete(`${REQUEST_URL}/${id}`)))
        .then(() => remove_items.map(item => item.name));
    })
    .then(removedItemNames => console.log(`You've removed ${removedItemNames.join(', ')}`))
    .then(() => require('./edit-menu')());
};

const updateItemPrompt = async() => {
  const foodList = await agent().get('http://localhost:7890/api/v1/food');

  const appList = foodList.body.filter(food => {if(food.type === 'appetizer') {return food;}}).map(app => {return app.name;});
  const entreeList = foodList.body.filter(food => {if(food.type === 'entree') {return food;}}).map(entree => {return entree.name;});
  const dessertList = foodList.body.filter(food => {if(food.type === 'dessert') {return food;}}).map(dessert => {return dessert.name;});
  const drinkList = foodList.body.filter(food => {if(food.type === 'drink') {return food;}}).map(drink => {return drink.name;});

  const updateMenuItemQs = [
    {
      type: 'list',
      message: 'Choose an item to update',
      name: 'item_to_update',
      choices: [
        new inquirer.Separator('APPETIZERS'), ...appList,
        new inquirer.Separator('ENTREES'), ...entreeList,
        new inquirer.Separator('DESSERT'), ...dessertList,
        new inquirer.Separator('DRINKS'), ...drinkList
      ],
    },
    {
      type: 'checkbox',
      message: 'Fields to update',
      name: 'updateFields',
      choices: ['Price', 'Unit Cost', 'Image']
    }
  ];

  const updatePriceQs = [
    {
      type: 'number',
      message: 'New price:',
      name: 'newPrice'
    }
  ];

  const updateUnitPriceQs = [
    {
      type: 'number',
      message: 'New cost of item:',
      name: 'newUnitCost'
    }
  ];

  const updateImageQs = [
    {
      type: 'input',
      message: 'Enter new image url:',
      name: 'updateImage'
    }
  ];

  return inquirer.prompt(updateMenuItemQs).then(results => {

    const foodToUpdate = foodList.body.filter(foodObj => {
      if(foodObj.name === results.item_to_update) {
        return foodObj;
      }
    });

    if(results.updateFields.includes('Price')) {
      return inquirer.prompt(updatePriceQs).then(newPrice => {
        foodToUpdate[0].price = newPrice.newPrice;
      })
        .then(() => {
          // updates unit cost
          if(results.updateFields.includes('Unit Cost')) {
            return inquirer.prompt(updateUnitPriceQs).then(newUnitCost => {
              foodToUpdate[0].unitCost = newUnitCost.newUnitCost;
            });
          }
        }).then(() => {
          if(results.updateFields.includes('Image')) {
            return inquirer.prompt(updateImageQs).then(newImage => {
              foodToUpdate[0].image = newImage.updateImage;
            });
          }
        })
        .then(() => {
          return agent()
            .patch(`http://localhost:7890/api/v1/food/${foodToUpdate[0]._id}`)
            .send(foodToUpdate[0])
            .then(() => {
              console.log('Your new menu item', foodToUpdate[0]);
            });
        })
        .then(() => require('./edit-menu')());
    }
  });
};

module.exports = {
  addItemPrompt,
  removeItemPrompt,
  updateItemPrompt
};
