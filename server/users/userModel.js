'use strict';
const bookshelf = require('./../database').bookshelf;
const knex = require('./../database').knex;

const User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;