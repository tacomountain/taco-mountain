const inquirer = require('inquirer');
const agent = require('../utils/requester');
const layoutMenu = require('../utils/layout-menu');
const chalkPipe = require('chalk-pipe');
const chance = require('chance').Chance();

const colors = ['#dd8080', '#ffac63', '#fce95d', '#c7fc5d', '#9dff7a', '#89ffae', '#9082ff', '#b266ff', '#fa84ff', '#ff5e5e'];

const REQUEST_URL = require('../utils/request-url');

module.exports = async(user) => {
  const customerMenuQ = [
    {
      type: 'checkbox',
      message: '\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n\n' + chalkPipe(chance.pickone(colors))(`Welcome to Taco Mountain ${user.name}.`) + chalkPipe(chance.pickone(colors))(`You have ${user.profile.rewards} rewards points.`) + '\n\n' + chalkPipe(chance.pickone(colors))('What would you like to order?') + '\n',
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
        message: chalkPipe(chance.pickone(colors))(`Your order subtotal is $${subtotal.toFixed(2)}. How much would you like to tip?`)
      };

      return inquirer.prompt(tipQ)
        .then(({ tip }) => {
          const total = tip + subtotal;

          const confirmQ = {
            type: 'confirm',
            name: 'confirmation',
            message: chalkPipe(chance.pickone(colors))(`Your total is $${total.toFixed(2)}. Would you like to place this order?`)
          };

          return inquirer.prompt(confirmQ)
            .then(({ confirmation }) => {
              if(confirmation) {
                return agent()
                  .post(`${REQUEST_URL}/orders`)
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
    .then(() => console.log(chalkPipe(chance.pickone(colors))('\n\nYour food will be out shortly. Thank you for coming to Taco Mountain!')));
};
