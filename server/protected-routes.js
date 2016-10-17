const express = require('express'),
      jwt     = require('express-jwt'),
      config  = require('config');

const app = module.exports = express.Router();

const jwtCheck = jwt({
  secret: config.get('secret')
});

app.use('/api/protected', jwtCheck);
