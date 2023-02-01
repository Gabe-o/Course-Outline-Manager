const sql = require('mysql2');
const process = require('dotenv');

// Stores MySQL connection information
var conn = sql.createConnection({
    host: 'localhost',
    user: process.env.DBUSERNANE,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
});

module.exports = conn;