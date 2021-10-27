const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localHost',
        user: 'root',
        password:'Kd0v4hkiin$1228',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = db;