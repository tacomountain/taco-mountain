const inquirer = require('inquirer');
const agent = require('../utils/requester');

module.exports = async(user) => {
  //** */access customer to get rewards
  const foodList = await agent().get('http://localhost:7890/api/v1/food');
  
  //creates a list of food based on food type
  const appList = foodList.body.filter(food => {if(food.type === 'appetizer') {return food;}}).map(app => {return app.name;});
  const entreeList = foodList.body.filter(food => {if(food.type === 'entree') {return food;}}).map(entree => {return entree.name;});
  const drinkList = foodList.body.filter(food => {if(food.type === 'drink') {return food;}}).map(drink => {return drink.name;});
  
  const customerOrder = [
    {
      type: 'checkbox',
      message: `Welcome to Taco Mountain ${user.name}. You have ${user.profile.rewards} rewards points. What would you like to order?`,
      name: 'food',
      choices: [
        new inquirer.Separator('DRINKS'), ...drinkList,
        new inquirer.Separator('APPETIZERS'), ...appList,
        new inquirer.Separator('TACOS'), ...entreeList,
      ],
    }];
  return inquirer.prompt(customerOrder)
    .then(order => {
      let foodArray = [];
      let prices = [];
      order.food.forEach(item => {
        foodList.body.forEach(food => {
          if(item === food.name) {
            foodArray.push(food);  
          }
        });
      });
      foodArray.forEach(food => {
        prices.push(food.price);
      });
      foodArray.forEach(food => {
        delete food.name;
        delete food.type;
        delete food.unitCost;
        delete food.image;
        food.foodItem = food._id;
        food.purchasePrice = food.price;
        delete food._id;
        delete food.price;
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const subtotal = Number((prices.reduce(reducer)).toFixed(2));

      const tipPrompt = {
        type: 'input',
        name: 'tip',
        message: `Your order subtotal is $${subtotal}. How much would you like to tip?`
      };

      inquirer.prompt(tipPrompt)
        .then(response => {
          const tip = Number(response.tip);
          const total = tip + subtotal;

          const confirmPrompt =   {
            type: 'confirm',
            name: 'confirm_order',
            message: `Your total is ${total}. Would you like to place this order?`
          };
          inquirer.prompt(confirmPrompt) 
            .then(choice => {
              switch(choice.confirm_order) {
                case true:
                  return agent()
                    .post('http://localhost:7890/api/v1/orders')
                    .send({
                      food: foodArray,
                      subtotal: subtotal,
                      tip: tip,
                      total: total
                    })
                    .then(order => {
                      console.log(order.body);
                      //what next?
                    });
                case false:
                  console.log('cancelled');
                  //back to menu
                
              }
            });
        });
    });
};
