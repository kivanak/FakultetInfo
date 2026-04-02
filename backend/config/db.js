// fajl koji sluzi za povezivanje PostgreSql bazom, radi lakseg koriscenja

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fakultetinfo',
  password: '12345678',  
  port: 5432,
});

module.exports = pool;