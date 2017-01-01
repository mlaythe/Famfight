'use strict';
const { bookshelf, knex } = require('../database');
const User = require('./userModel');
const tokenController = require('../util/tokenController');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;
const userController = {};

userController.createTable = () => {
  return knex.schema.createTableIfNotExists('users', (user) => {
    user.increments();
    user.string('username');
    user.string('password');
  });
};

userController.authenticateUser = (req, res, next) => {
  User
    .query({ where: { email: req.body.email } })
    .fetch()
    .then((model) => {
      if (!model) {
        return res.status(400).send('Invalid email');
      }

      const isValidUser = userController.decryptPassword(req.body, model.attributes.password);
      
      return isValidUser ? next() : res.status(401).send('Password does not match our records.');
    })
    .catch((err) => {
      return res.status(400).send('Error authenticating user.');
    });
};

userController.createUser = (req, res, next) => {
  userController.createTable()
    .then(() => {
      User
        .query({ where: { username: req.body.username } })
        .fetch()
        .then((model) => {
          if (model) {
            return res.status(400).send('Username is already taken.');
          }
          
          userController.encryptPassword(req.body);

          User.forge(req.body).save().then((result) => {
            return res.status(201).send({
              id_token: tokenController.createToken(result.attributes),
            });
          });
        });
    })
    .catch((err) => {
      return res.status(400).send('Error adding user to database: ', err.message);
    });
};

// userController.createUsernameID = (user) => {
//   const ID = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2);
//   const indexOfAt = user.email.indexOf('@');

//   user.emailID = user.email.slice(0, indexOfAt) + ID;
// };

userController.encryptPassword = (user) => {
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
};

userController.decryptPassword = (user, password) => {
  return bcrypt.compareSync(user.password, password);
};

module.exports = userController;
