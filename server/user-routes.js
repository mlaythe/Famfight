const express = require('express'),
      _       = require('lodash'),
      jwt     = require('jsonwebtoken'),
      userController = require('./users/userController.js'),
      familyController = require('./families/familyController'),
      tokenController = require('./util/tokenController');

const app = module.exports = express.Router();

app.post('/user/signup', userController.createUser);

app.post('/family/create', familyController.createFamily);

app.post('/family/join', familyController.joinFamily);

app.post('/sessions/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  res.status(201).send({
    id_token: tokenController.createToken(user)
  });
});
