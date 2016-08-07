const express = require('express'),
      _       = require('lodash'),
      config  = require('./config'),
      jwt     = require('jsonwebtoken'),
      userController = require('./users/userController'),
      tokenController = require('./util/tokenController');

const app = module.exports = express.Router();

app.post('/family/create', userController.createFamily);

app.post('/family/join', userController.joinFamily);

app.post('/sessions/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  res.status(201).send({
    id_token: tokenController.createToken(user)
  });
});
