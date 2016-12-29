const express = require('express'),
      _       = require('lodash'),
      jwt     = require('jsonwebtoken'),
      userController = require('./users/userController.js'),
      familyController = require('./families/familyController'),
      tokenController = require('./util/tokenController');

const app = module.exports = express.Router();

app.post('/users/signup', userController.createUser);

app.post('/families/create', familyController.createFamily);

app.post('/families/join', familyController.joinFamily);
