const knex = require('./database');

knex.schema
  .createTable('accounts', (table) => {
    table.increments('id');
    table.string('user_email').notNullable().unique();
    table.integer('user_id').notNullable().unique();
    table.float('balance').notNullable().defaultTo(0);
    table.timestamps(true, true);
  })
  .then(() => console.log('accounts table created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
