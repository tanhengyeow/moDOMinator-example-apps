// Load environment variables from .env
require('dotenv').config();

const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  }
};
