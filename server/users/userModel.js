const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
      
const sequelize = require('../database.js');

const SALT_FACTOR = 10;

const Users = sequelize.define('user', {
  familyKey: Sequelize.STRING,
  username: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set: function(pw) {
      const salt = bcrypt.genSaltSync(SALT_FACTOR);
      const hash = bcrypt.hashSync(pw, salt);
      this.setDataValue('password', hash);
    }
  },
  adminFlag: Sequelize.BOOLEAN,
});

Users.sync({force: true});

module.exports = Users;