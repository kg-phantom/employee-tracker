const db = require('../db/connection');
const cTable = require('console.table');

// class Table {
//     constructor(name) {
//         this.name = name;
//     }

//     displayTable() {
//         db.promise().query(`SELECT * FROM ${this.name}`)
//         .then(([rows]) => {
//             console.log('\n');
//             console.table(rows);
//         })
//         .catch(console.log)
//     }
// }

class Department {
    // constructor(name) {
    //     super(name);
    // }

    displayDepartments() {
        db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        })
        .catch(console.log)
    }

    addDepartment(departmentName) {
        db.promise().query(`INSERT INTO department (name) VALUES (?)`, departmentName)
        console.log(`${departmentName} department added.`);
    }
}

class Role {
    // constructor(name) {
    //     super(name);
    // }

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

    addRole({ title, salary, department_id }) {
        let params = [title, salary, department_id];

        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params)
            .then(title => {
                console.log(`${title} role added.`);
            })
    }
}

class Employee {
    // constructor(name) {
    //     super(name);
    // }

    displayEmployees() {
        db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id AS manager
        FROM employee
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

    addEmployee({ first_name, last_name, role_id, manager_id }) {
        let params = [first_name, last_name, role_id, manager_id];

        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params)
            .then((first_name, last_name) => {
                console.log(`${first_name} ${last_name} added.`);
            })
    }
}

module.exports = {
    //Table,
    Department,
    Role,
    Employee
};