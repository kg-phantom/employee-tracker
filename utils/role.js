const db = require('../db/connection');
const cTable = require('console.table');

const displayRoles = () => {
    db.promise().query(`SELECT * FROM role`)
        .then(([rows]) => {
            console.log('\n');
            console.table('Roles', rows);
        })
        .catch(console.log)
};

module.exports = displayRoles;