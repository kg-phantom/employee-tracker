const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');
const promptUser = require('../utils/promptUser');

class Employee {
    displayEmployees() {
        db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (employee2.first_name," ",employee2.last_name) AS manager
        FROM employee
        LEFT JOIN employee AS employee2
        ON employee.manager_id = employee2.id
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id
        `)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        })
        .catch(console.log)
    }

    promptNewEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the new employee's first name?",
                validate: input => {
                    if(input) {
                        return true;
                    } else {
                        console.log('\nPlease enter a first name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the new employee's last name?",
                validate: input => {
                    if(input) {
                        return true;
                    } else {
                        console.log('\nPlease enter a last name!');
                        return false;
                    }
                }
            },
        ])
        .then(({ first_name, last_name }) => {
            return db.promise().query(`SELECT title AS name FROM role`)
                .then(([rows]) => {
                    return inquirer.prompt({
                        type: 'list',
                        name: 'role',
                        message: "What is the new employee's role?",
                        choices: rows
                    })
                    .then(({ role }) => {
                        return {
                            first_name: first_name,
                            last_name: last_name,
                            role: role
                        }
                    })
                })
                .then(({ first_name, last_name, role }) => {
                    // convert role name into id
                    return db.promise().query(`SELECT id FROM role where title = ?`, role)
                    .then(([row]) => row[0].id)
                    .then(role_id => {
                        return {
                            first_name: first_name,
                            last_name: last_name,
                            role_id: role_id
                        }
                    })
                    
                })
                .then(({ first_name, last_name, role_id }) => {
                    return db.promise().query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employee`)
                        .then(([rows]) => {
                            return inquirer.prompt({
                                type: 'list',
                                name: 'manager',
                                message: "Which employee do you want to set as manager for the selected employee?",
                                choices: rows
                            })
                            .then(({ manager }) => {
                                let managerArr = manager.split(' ');
                                return {
                                    first_name: first_name,
                                    last_name: last_name,
                                    role_id: role_id,
                                    manager: managerArr[1]
                                }
                            })
                        })
                        .then(({ first_name, last_name, role_id, manager }) => {
                            // convert manager name into id
                            return db.promise().query(`SELECT id FROM employee where last_name = ?`, manager)
                            .then(([row]) => row[0].id)
                            .then(manager_id => {
                                return {
                                    first_name: first_name,
                                    last_name: last_name,
                                    role_id: role_id,
                                    manager_id: manager_id
                                }
                            })
                            
                        })
                })
        })
        .then(({ first_name, last_name, role_id, manager_id }) => {
            let params = [first_name, last_name, role_id, manager_id];

            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params, (err, row) => {
                if(err) {
                    console.log(err);
                }
            })
            console.log(`${first_name} ${last_name} added.`);
        });
    }
}

module.exports = Employee;