const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');
const promptUser = require('../utils/promptUser');

class Role {
    displayRoles() {
        db.promise().query(`SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        })
        .catch(console.log)
    }

    validateNewRole(title) {
        return db.promise().query(`SELECT id FROM role WHERE title = ?`, title)
            .then(([row]) => {
                console.log(row);
            })

}

    promptNewRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the new role?',
                validate: input => {
                    if(input) {
                        return true;
                    } else {
                        console.log('\nPlease enter a title!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role?',
                validate: input => {
                    var regex = /^[0-9]+$/;
                    if(input.match(regex)) {
                        return true;
                    } else {
                        console.log('\nPlease enter a salary!');
                        return false;
                    }
                }
            },
        ])
        .then(({ title, salary }) => {
            return db.promise().query(`SELECT name FROM department`)
                .then(([rows]) => {
                    return inquirer.prompt({
                        type: 'list',
                        name: 'department',
                        message: 'What is the department of the new role?',
                        choices: rows
                    })
                    .then(({ department }) => {
                        return {
                            title: title,
                            salary: salary,
                            department: department
                        }
                    })
                })
                .then(({ title, salary, department }) => {
                    // convert department name into id
                    return db.promise().query(`SELECT id FROM department where name = ?`, department)
                    .then(([row]) => row[0].id)
                    .then(department_id => {
                        return {
                            title: title,
                            salary: salary,
                            department_id: department_id
                        }
                    })
                    
                })
        })
        .then(({ title, salary, department_id}) => {
            let params = [title, salary, department_id];

            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params, (err, row) => {
                if(err) {
                    console.log(err);
                }
            })
            console.log(`${title} role added.`);
        });
    }    
}

module.exports = Role;