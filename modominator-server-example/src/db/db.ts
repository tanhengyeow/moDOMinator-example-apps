// tslint:disable-next-line
const pg = require('pg');

pg.types.setTypeParser(20, 'text', parseInt); // bigint
pg.types.setTypeParser(1700, 'text', parseFloat); // numeric/decimal

import * as knex from 'knex';

// tslint:disable-next-line
const config: any = require('../../knexfile.js');

const db = knex(config);
db.migrate.latest();

export default db;
