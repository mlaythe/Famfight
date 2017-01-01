const express = require('express');
const userController = require('../users/userController.js');

const app = module.exports = express.Router();

app.post('/users/signup', userController.createUser);
app.post('/users/login', userController.authenticateUser);
