const { Pool } = require('pg');
require('dotenv').config();
const { key } = process.env;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: key,
    database: 'joyas',
    allowExitOnIdle: true
});

module.exports = pool;