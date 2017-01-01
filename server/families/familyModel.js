const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('../users/userModel');

const Family = sequelize.define('family', {
  name: Sequelize.STRING,
});

Family.belongsTo(User);

Family.sync();

module.exports = Family;
