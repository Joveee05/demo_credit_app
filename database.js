const dotenv = require('dotenv').config({ path: './config.env' });
const path = require('path');

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
  pool: {
    min: 1,
    max: 10,
  },
});

module.exports = knex;
