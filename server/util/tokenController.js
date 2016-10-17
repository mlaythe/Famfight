const _ = require('lodash'),
      jwt = require('jsonwebtoken'),
      config  = require('config');
      
const tokenController = {};

tokenController.createAdminToken = (user, key) => {
  user = _.omit(user, 'password');
  user.admin = true;
  user.key = key;
  return jwt.sign(user, config.get('secret'), { expiresIn: 60 * 60 * 5 });
};

tokenController.createToken = (user, key) => {
  user = _.omit(user, 'password');
  user.admin = false;
  user.key = key;
  return jwt.sign(user, config.get('secret'), { expiresIn: 60 * 60 * 5 });
};

tokenController.createFamilyKey = user => {
  let id = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2);

  return user.familyName + id;
};

module.exports = tokenController;