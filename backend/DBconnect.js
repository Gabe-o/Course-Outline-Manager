import sql from 'mysql2';
import 'dotenv/config';

// Stores MySQL connection information
var conn = sql.createConnection({
    host: 'localhost',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
});

export default conn;