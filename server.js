const app = require('./app');
const dotenv = require('dotenv');
const knex = require('./database');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception...');
  process.exit(1);
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
  knex.raw('SELECT VERSION()').then(() => {
    console.log('Connection to DataBase Successful');
  });
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
