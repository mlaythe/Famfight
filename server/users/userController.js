'use strict';
const User = require('./userModel');
const authUtils = require('../utils/authUtils');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;
const userController = {};

userController.authenticateUser = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
  .then((user) => {
    if (!user) {
      return res.status(400).send('Incorrect credentials.');
    }

    const isValidUser = userController.decryptPassword(req.body, user.dataValues.password);

    if (isValidUser) {
      return res.status(200).send({
        id_token: authUtils.createToken(user.dataValues),
      });
    }

    return res.status(401).send('Incorrect credentials.');
  })
  .catch((err) => console.error(err));
};

userController.createUser = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
  .then((user) => {
    if (user) {
      return res.status(400).send('Username is already taken.');
    }

    userController.encryptPassword(req.body);

    User.create(req.body).then((user) => {
      return res.status(201).send({
        id_token: authUtils.createToken(user.dataValues),
      });
    })
    .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
};

userController.encryptPassword = (user) => {
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
};

userController.decryptPassword = (user, password) => {
  return bcrypt.compareSync(user.password, password);
};

module.exports = userController;
