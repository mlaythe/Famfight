'use strict';
const config = require('config');

const knex = require('knex')({
  client: 'pg',
  connection: config.get('db-url'),
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