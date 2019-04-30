require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('./seed-data');
const User = require('../../lib/models/User');
const app = require('../../lib/app');
const request = require('supertest');
const Food = require('../../lib/models/Food');



beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

const adminAgent = request.agent(app);
beforeEach(() => {
  return adminAgent
    .post('/api/v1/auth/signup/admin')
    .send({ name: 'Anna', phone: '9999999999', password: 'password' });
});

const customerAgent = request.agent(app);
beforeEach(() => {
  return customerAgent
    .post('/api/v1/auth/signup/customer')
    .send({ name: 'Naan', phone: '9999999999', password: 'password' });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));
const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(User),
  ...createGetters(Food),
  getAdminAgent: () => adminAgent,
  getCustomerAgent: () => customerAgent
};
