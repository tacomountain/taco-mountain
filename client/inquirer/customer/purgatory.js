const drinks = ['Horchata', 'Margarita', 'Mandarin Jarritos', 'Topo Chico'];
const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
const tacos = ['Beef', 'Chicken', 'Fish', 'Fajita Veggie'];

const customerOrderTasks = [
  {
    type: 'checkbox',
    message: 'Welcome to Taco Mountain [customer name]. You have [#] rewards points. What would you like to order?',
    name: 'food',
    choices: [
      new inquirer.Separator('DRINKS'), ...drinks,
      new inquirer.Separator('APPETIZERS'), ...apps,
      new inquirer.Separator('TACOS'), ...tacos,
    ],
  },
  {
    type: 'input',
    name: 'tip',
    message: 'Your order total is [$$]. How much would you like to tip?'
  },
  {
    type: 'confirm',
    name: 'confirm_order',
    message: 'Would you like to place this order?'
  }
//add if statement for rewards points
];

const customerReturn = [
  {
    type: 'list',
    name: 'return',
    message: 'Thank you for your order! You will receive your food shortly. Would you like to place another order?',
    choices: ['Place Another Order', 'Logout']
  }
];

const customerCancel = [
  {
    type: 'confirm',
    name: 'cancel',
    message: 'Would you like to cancel your order and logout?'
  }
];

const customerMenu = async() => {
  //access customer to get rewards
  const foodList = await agent().get('http://localhost:7890/api/v1/food');

  //creates a list of food based on food type
  const appList = foodList.body.filter(food => {if(food.type === 'appetizer') {return food;}}).map(app => {return app.name;});
  const entreeList = foodList.body.filter(food => {if(food.type === 'entree') {return food;}}).map(entree => {return entree.name;});
  const dessertList = foodList.body.filter(food => {if(food.type === 'dessert') {return food;}}).map(dessert => {return dessert.name;});
  const drinkList = foodList.body.filter(food => {if(food.type === 'drink') {return food;}}).map(drink => {return drink.name;});

  const customerOrder = [
    {
      type: 'checkbox',
      message: 'Welcome to Taco Mountain [customer name]. You have [#] rewards points. What would you like to order?',
      name: 'food',
      choices: [
        new inquirer.Separator('DRINKS'), ...drinkList,
        new inquirer.Separator('APPETIZERS'), ...appList,
        new inquirer.Separator('TACOS'), ...entreeList,
        new inquirer.Separator('Dessert'), ...dessertList,
      ],
    }];
  inquirer.prompt(customerOrder)
    .then(order => {
      //take the array of food, find it from the foodlist, get the price, return the total of prices
      let orderFoods = [];
      let prices = [];
      order.food.forEach(item => {
        foodList.forEach(food => {
          if(item === food.name) {
            orderFoods.push(food);  
          }
        });
      });
      orderFoods.forEach(food => {
        prices.push(food.price);
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      console.log(prices.reduce(reducer));
      return prices.reduce(reducer);
    })
    .then(subtotal => {
      const tipPrompt = {
        type: 'input',
        name: 'tip',
        message: `Your order subtotal is $${subtotal}. How much would you like to tip?`
      };
      inquirer.prompt(tipPrompt)
        .then(choice => {
            return choice.tip + subtotal;
        })
        .then(total => {

        })
    });

};

module.exports = customerMenu;
        .then(subtotal => {
        //have the subtotal in the next prompt, put the subtotal in the .post
        })

    



    switch(Response.confirm_order) {
        case true:
            //send order
            .then(() => {
                orderPlaced();
            })
        case false:
            cancelOrder();
    }
    
    const orderPlaced = () =>
    inquirer.prompt(customerReturn)
    .then(() => {
        switch(customerReturn.return) {
            case 'Place Another Order':
                customerOrder();
            case 'Logout':
                //back to main menu
        }
    });

const cancelOrder = () => 
    inquirer.prompt(customerCancel)
    .then(() => {
        switch(customerCancel.cancel) {
            case true:
            //back to main menu
            case false: 
            customerOrder();
        }
    });
        

