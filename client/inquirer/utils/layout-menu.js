const agent = require('./requester');
const inquirer = require('inquirer');

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
    new inquirer.Separator('APPETIZERS'), ...appetizerList,
    new inquirer.Separator('ENTREES'), ...entreeList,
    new inquirer.Separator('DRINKS'), ...drinkList
  ];
};
