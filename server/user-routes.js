const express = require('express');
const userController = require('./users/userController.js');
const familyController = require('./families/familyController');
const tokenController = require('./util/tokenController');

const app = module.exports = express.Router();

app.post('/users/signup', userController.createUser);

app.post('/families/create', familyController.createFamily);

app.post('/families/join', familyController.joinFamily);
