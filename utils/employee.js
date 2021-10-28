const db = require('../db/connection');
const cTable = require('console.table');

const displayEmployees = () => {
    db.promise().query(`SELECT * FROM employee`)
        .then(([rows]) => {
            console.log('\n');
            console.table('Employees', rows);
        })
        .catch(console.log)
};

module.exports = displayEmployees;