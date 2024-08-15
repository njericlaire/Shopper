const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '', // Empty string for no password
  database: process.env.DB_NAME || 'portfolio',
});

module.exports = pool;

