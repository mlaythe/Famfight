'use strict';
const { bookshelf, knex } = require('./../database');

const Family = bookshelf.Model.extend({
  tableName: 'families'
});

module.exports = Family;
