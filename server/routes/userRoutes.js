const express = require('express');
const userController = require('../users/userController.js');
const expressJoi = require('express-joi');

const app = module.exports = express.Router();

const createUserSchema = {
  username: expressJoi.Joi.types.String().min(4).required(),
  password: expressJoi.Joi.types.String().min(4).required(),
};

const loginUserSchema = {
  username: expressJoi.Joi.types.String().min(4).required(),
  password: expressJoi.Joi.types.String().min(4).required(),
};

app.post('/users/signup', expressJoi.joiValidate(createUserSchema), userController.createUser);
app.post('/users/login', expressJoi.joiValidate(loginUserSchema), userController.authenticateUser);
