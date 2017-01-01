const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
  ],
});

User.sync();

module.exports = User;
