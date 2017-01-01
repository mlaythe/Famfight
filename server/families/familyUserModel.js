const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('../users/userModel');
const Family = require('./familyModel');

const familyUser = sequelize.define('family_user');

familyUser.belongsTo(User);
familyUser.belongsTo(Family);

familyUser.sync();

module.exports = familyUser;
