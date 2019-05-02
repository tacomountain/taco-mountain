// const inquirer = require('inquirer');

// const drinks = ['Horchata', 'Margarita', 'Mandarin Jarritos', 'Topo Chico'];
// const apps = ['Chips and Salsa', 'Chips and Guacamole', 'Loaded Nachos'];
// const tacos = ['Beef', 'Chicken', 'Fish', 'Fajita Veggie'];

// const customerOrderTasks = [
//   {
//     type: 'checkbox',
//     message: 'Welcome to Taco Mountain [customer name]. You have [#] rewards points. What would you like to order?',
//     name: 'food',
//     choices: [
//       new inquirer.Separator('DRINKS'), ...drinks,
//       new inquirer.Separator('APPETIZERS'), ...apps,
//       new inquirer.Separator('TACOS'), ...tacos,
//     ],
//   },
//   {
//     type: 'input',
//     name: 'tip',
//     message: 'Your order total is [$$]. How much would you like to tip?'
// },
// {
//     type: 'confirm',
//     name: 'confirm_order',
//     message: 'Would you like to place this order?'
// }
// //add if statement for rewards points
// ];

// const customerReturn = [
//     {
//         type: 'list',
//         name: 'return',
//         message: 'Thank you for your order! You will receive your food shortly. Would you like to place another order?',
//         choices: ['Place Another Order', 'Logout']
//       }
// ];

// const customerCancel = [
//     {
//         type: 'confirm',
//         name: 'cancel',
//         message: 'Would you like to cancel your order and logout?'
//     }
// ]

// const customerOrder = () => 
//     inquirer.prompt(customerOrderTasks)
//         .then(order => {
//             switch(Response.confirm_order) {
//                 case true:
//                     //send order
//                     .then(() => {
//                         orderPlaced();
//                     });
//                 case false:
//                     cancelOrder();
//             }
//     });

// const orderPlaced = () =>
//     inquirer.prompt(customerReturn)
//     .then(() => {
//         switch(customerReturn.return) {
//             case 'Place Another Order':
//                 customerOrder();
//             case 'Logout':
//                 //back to main menu
//         }
//     });

// const cancelOrder = () => 
//     inquirer.prompt(customerCancel)
//     .then(() => {
//         switch(customerCancel.cancel) {
//             case true:
//             //back to main menu
//             case false: 
//             customerOrder();
//         }
//     });
        

