const inquirer = require('inquirer');
const request = require('superagent');
const agent = require('../../requester');
const Food = require('../../../../lib/models/Food');

const addMenuItemQs = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of menu item',
    choices: ['appetizer', 'Entre', 'Dessert', 'Drink']
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
    message: 'PhotoUrl'
  },
  {
    type: 'confirm',
    name: 'confirm_order',
    message: 'Add this item to the menu?'
  }
];

const addItemPrompt = () => inquirer.prompt(addMenuItemQs).then(({ type, name, price, unitCost, image, confirm_order }) => {
  if(confirm_order) {
    return agent()
      .post('http://localhost:7890/api/v1/food')
      .send({ name, type, price, unitCost, image })
      .then(() => {
        require('./edit-menu')();})
      .catch();
  } else {
    require('./edit-menu')();
  }
});

const removeItemPrompt = async() => {
  // gets a list of all food in the database
  const foodList = await agent().get('http://localhost:7890/api/v1/food');

  //creates a list of food based on food type
  const appList = foodList.body.filter(food => {if(food.type === 'appetizer') {return food;}}).map(app => {return app.name;});
  const entreeList = foodList.body.filter(food => {if(food.type === 'entree') {return food;}}).map(entree => {return entree.name;});
  const dessertList = foodList.body.filter(food => {if(food.type === 'dessert') {return food;}}).map(dessert => {return dessert.name;});
  const drinkList = foodList.body.filter(food => {if(food.type === 'drink') {return food;}}).map(drink => {return drink.name;});


  // inquirer qs
  const removeMenuItemQs = [
    {
      type: 'checkbox',
      message: 'Select items to remove from menu',
      name: 'remove_items',
      choices: [
        new inquirer.Separator('APPETIZERS'), ...appList,
        new inquirer.Separator('TACOS'), ...entreeList,
        new inquirer.Separator('DESSERT'), ...dessertList,
        new inquirer.Separator('DRINKS'), ...drinkList
      ],
    },
    {
      type: 'confirm',
      name: 'confirm_order',
      message: 'Would you like to remove these item(s)?'
    }
  ];

  // remove item logic
  return inquirer.prompt(removeMenuItemQs).then(results => {
    // creating a list of ids to delete
    let idsToDelete = [];
    results.remove_items.forEach(food => {
      foodList.body.filter(foodOBj => {

        if(foodOBj.name === food) { 
          idsToDelete.push(foodOBj._id); }
      });
    });
    return idsToDelete;
  })
    .then(ids => {
      // for each id, ping server with delete request
      return ids.forEach(id => {
        return agent()
          .delete(`http://localhost:7890/api/v1/food/${id}`)
          .then(deletedFood => {
            console.log(`You deleted ${deletedFood.body.name}`);
          });
      });
    })
    .then(() => require('./edit-menu')());
};



const updateItemPrompt = async() => {
  
  // gets a list of all food in the database
  const foodList = await agent().get('http://localhost:7890/api/v1/food');

  //creates a list of food based on food type
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
  
  // udpate item logic
  return inquirer.prompt(updateMenuItemQs).then(results => {
    console.log('results', results);

    const foodToUpdate = foodList.body.filter(foodObj => {
      if(foodObj.name === results.item_to_update) {
        console.log('food obj', foodObj);
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
