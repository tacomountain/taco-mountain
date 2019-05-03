const agent = require('./requester');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

const REQUEST_URL = require('./request-url');

module.exports = async() => {
  const foodList = await agent().get(`${REQUEST_URL}/food`);
  const filterFoodList = type => foodList.body.filter(food => food.type === type)
    .map(food => ({
      name: `${food.name} - $${food.price.toFixed(2)}`,
      value: {
        _id: food._id,
        name: food.name,
        price: food.price
      }
    }));

  const appetizerList = filterFoodList('appetizer');
  const entreeList = filterFoodList('entree');
  const drinkList = filterFoodList('drink');

  return [
    new inquirer.Separator('\n' + chalkPipe(chance.pickone(colors))('DRINKS')), ...drinkList,
    new inquirer.Separator('\n' + chalkPipe(chance.pickone(colors))('APPETIZERS')), ...appetizerList,
    new inquirer.Separator('\n' + chalkPipe(chance.pickone(colors))('ENTREES')), ...entreeList
  ];
};
