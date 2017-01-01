const express = require('express');
const familyController = require('../families/familyController');

const app = module.exports = express.Router();

app.post('/families/create', familyController.createFamily);
app.post('/families/join', familyController.joinFamily);
