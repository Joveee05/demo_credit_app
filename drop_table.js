const knex = require('./database');
knex.schema
  .dropTable('transactions')
  .then(() => console.log('table dropped'))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
