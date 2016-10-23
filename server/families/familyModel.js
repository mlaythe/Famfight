'use strict';
const bookshelf = require('./../database').bookshelf;
const knex = require('./../database').knex;

const Family = bookshelf.Model.extend({
  tableName: 'families'
});

module.exports = Family;