'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('sequelize');
let sequelize;

try {
  sequelize = new Sequelize(config.get('db-url'), {
    logging: false,
  });
} catch(err) {
  console.error(err);
}

sequelize.authenticate().then(() => {
  console.log('Successfully connected to database!');
})
.catch((err) => console.error(err));

module.exports = sequelize;
