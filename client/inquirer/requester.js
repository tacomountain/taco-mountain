const request = require('superagent');

const agent = request.agent();
console.log(agent);

module.exports = () => agent;
