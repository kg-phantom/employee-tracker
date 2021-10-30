const db = require('../db/connection');
const cTable = require('console.table');

class Department {
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

    getDepartments() {
        // sets departments array
        function setDepartmentArray(arr) {
            let departmentArr = arr;
            return departmentArr;
        }

        // converts department rows into array
        function test() {
            db.query(`SELECT name FROM department`, (err, rows) => {
            if(err) {
                console.log(err);
            } else {
                return setDepartmentArray(rows);
            }
        });
        }
        console.log(test());
    }
}

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
        let result = () => {
            db.query(`SELECT id FROM role WHERE title = ?`, title);
            console.log(result);
        }

        return result;
    }

    addRole(title, salary, department) {
        // sets department id
        function setDepartmentId(id) {
            let departmentId = id;
            return departmentId;
        }
        // converts department name into id
        function getDepartmentId(departmentName) {
            db.query(`SELECT id FROM department WHERE name = ?`, departmentName, (err, [row]) => {
                if(err) {
                    console.log(err);
                } else {
                    return setDepartmentId(row.id);
                }
            });
        }
        
        console.log(getDepartmentId(department));
    };
        

        // let params = [title, salary, department_id];

        // db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params)
        //     .then(title => {
        //         console.log(`${title} role added.`);
            // })
        
}

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

    addEmployee({ first_name, last_name, role_id, manager_id }) {
        let params = [first_name, last_name, role_id, manager_id];

        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params)
            .then((first_name, last_name) => {
                console.log(`${first_name} ${last_name} added.`);
            })
    }
}

module.exports = {
    Department,
    Role,
    Employee
};