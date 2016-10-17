'use strict';

const knex = require('knex')({
  client: 'pg',
  connection: '',
  pool: {
    min: 1,
    max: 7
  }
});

const bookshelf = require('bookshelf')(knex);

module.exports = {
  knex,
  bookshelf
};