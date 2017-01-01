const express = require('express');
const jwt = require('express-jwt');
const config = require('config');

const app = module.exports = express.Router();

const jwtCheck = jwt({
  secret: config.get('secret')
});

app.use('/api/protected', jwtCheck);
