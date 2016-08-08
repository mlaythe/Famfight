'use strict';
const Sequelize = require('Sequelize');

const privateKey = require('./config').dbKey;

const sequelize = new Sequelize(privateKey);

sequelize
  .authenticate()
  .then( () => {
    console.log('Connected to database.');
  })
  .catch( err => {
    console.log('Unable to connect to database:', err.message);
  });

module.exports = sequelize;