'use strict';
const { bookshelf, knex } = require('./../database');

const User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;