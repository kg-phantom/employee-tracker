const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

class Department {
    displayDepartments() {
        db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        })
        .catch(console.log)
    }

    promptNewDepartment() {
        return inquirer.prompt({
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new department?',
            validate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('\nPlease enter a department name!');
                    return false;
                }
            }
        })
        .then(({ departmentName }) => {
            db.promise().query(`INSERT INTO department (name) VALUES (?)`, departmentName)
            console.log(`${departmentName} department added.`);
        });
    }
}

module.exports = Department;