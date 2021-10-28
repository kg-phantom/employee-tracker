const db = require('../db/connection');
const cTable = require('console.table');

const displayDepartments = () => {
    db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.log('\n');
            console.table('Departments', rows);
        })
        .catch(console.log)
};

module.exports = displayDepartments;