const knex = require('./database');

knex.schema
  .createTable('users', (table) => {
    table.increments('id');
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
    table.double('balance').notNullable().defaultTo(0.0).checkNegative();
    table.timestamps(true, true);
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
