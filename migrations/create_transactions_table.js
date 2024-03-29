const knex = require('../database');

knex.schema
  .createTable('transactions', (table) => {
    table.increments('id');
    table.string('transactionType').notNullable();
    table.integer('account_id').notNullable();
    table.float('amount').notNullable();
    table.timestamps(true, true);
  })
  .then(() => console.log('transactions table created'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
