const request = require('superagent');

const agent = request.agent();

module.exports = () => agent;
