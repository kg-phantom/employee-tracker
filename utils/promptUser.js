const inquirer = require('inquirer');
const Department = require('../lib/Department');
const Role = require('../lib/Role');
const Employee = require('../lib/Employee');

// objects for tables
const departmentTable = new Department();
const roleTable = new Role();
const employeeTable = new Employee();

const promptUser = () => {
    inquirer
    .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    })
    .then(({ action }) => {
        switch (action) {
            case 'View All Departments':
                departmentTable.displayDepartments()
                    .then(promptUser);
                break;
            case 'View All Roles':
                roleTable.displayRoles()
                    .then(promptUser);
                break;
            case 'View All Employees':
                employeeTable.displayEmployees()
                    .then(promptUser);
                break;
            case 'Add A Department':
                departmentTable.promptNewDepartment()
                    .then(promptUser);
                break;
            case 'Add A Role':
                roleTable.promptNewRole()
                    .then(promptUser);
                break;
            case 'Add An Employee':
                employeeTable.promptNewEmployee()
                    .then(promptUser);
                break;
            case 'Update An Employee Role':
                employeeTable.promptUpdateRole()
                    .then(promptUser);
                break;
        }
    })
};

module.exports = promptUser;