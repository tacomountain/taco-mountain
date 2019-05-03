const inquirer = require('inquirer');
const agent = require('../utils/requester');
const layoutMenu = require('../utils/layout-menu');

module.exports = async(user) => {
  const customerMenuQ = [
    {
      type: 'checkbox',
      message: `Welcome to Taco Mountain ${user.name}. You have ${user.profile.rewards} rewards points. What would you like to order?`,
      name: 'order',
      choices: await layoutMenu(),
    }
  ];

  return inquirer.prompt(customerMenuQ)
    .then(({ order }) => {
      const subtotal = order.reduce((acc, cur) => acc + cur.price, 0);

      const orders = order.map(({ _id, name, price }) => ({
        foodId: _id,
        name,
        purchasePrice: price
      }));

      const tipQ = {
        type: 'number',
        name: 'tip',
        message: `Your order subtotal is $${subtotal.toFixed(2)}. How much would you like to tip?`
      };

      return inquirer.prompt(tipQ)
        .then(({ tip }) => {
          const total = tip + subtotal;

          const confirmQ = {
            type: 'confirm',
            name: 'confirmation',
            message: `Your total is $${total.toFixed(2)}. Would you like to place this order?`
          };

          return inquirer.prompt(confirmQ)
            .then(({ confirmation }) => {
              if(confirmation) {
                return agent()
                  .post('http://localhost:7890/api/v1/orders')
                  .send({
                    food: orders,
                    subtotal: subtotal,
                    tip: tip,
                    total: total
                  });
              }
            
            });
        });
    })
    .then(() => console.log('Thank you for coming to Taco Mountain!'));
};
