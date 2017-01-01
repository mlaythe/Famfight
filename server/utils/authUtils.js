const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config  = require('config');
      
const authUtils = {};

authUtils.createAdminToken = (user, key) => {
  user = _.omit(user, 'password');
  user.admin = true;
  user.key = key;
  return jwt.sign(user, config.get('secret'), { expiresIn: 60 * 60 * 5 });
};

authUtils.createToken = (user) => {
  user = _.omit(user, 'password');
  user.admin = false;
  return jwt.sign(user, config.get('secret'), { expiresIn: 60 * 60 * 5 });
};

authUtils.createFamilyKey = (user) => {
  const id = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2);

  return user.familyName + id;
};

module.exports = authUtils;
