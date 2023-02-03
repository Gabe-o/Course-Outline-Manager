const sql = require('mysql2');
require('dotenv').config();

// Stores MySQL connection information
var conn = sql.createConnection({
    host: 'localhost',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
});

module.exports = conn;