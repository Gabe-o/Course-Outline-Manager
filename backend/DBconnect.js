const sql = require('mysql2');
const process = require('dotenv');

// Stores MySQL connection information
var conn = sql.createConnection({
    host: 'localhost',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
});

module.exports = conn;