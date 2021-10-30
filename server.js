const db = require('./db/connection');
const express = require('express');
const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

// objects for tables
const departmentTable = new Department();
const roleTable = new Role();
const employeeTable = new Employee();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if(err) throw err;
});

// Intro screen
console.log(
`
 ______                 _                       
|  ____|               | |                      
| |__   _ __ ___  _ __ | | ___  _   _  ___  ___ 
|  __| | '_ \` _ \\| '_  \| |/ _ \\| | | |/ _ \\/ _ \\
| |____| | | | | | |_) | | (_) | |_| |  __/  __/
|______|_| |_| |_| .__/|_|\\___/\\__,  |\\___|\\___|
 _______         | | _          __/  |          
|__   __|        |_|| |        |____/           
   | |_ __ __ _  ___| | _____ _ __              
   | | '__/ _\` |/ __| |/ / _ \\ '__|             
   | | | | (_| | (__|   <  __/ |                
   |_|_|  \\__,_|\\___|_|\\_\\___|_|                
                                               
                                               
`
);

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
                departmentTable.displayDepartments();
                break;
            case 'View All Roles':
                roleTable.displayRoles();
                break;
            case 'View All Employees':
                employeeTable.displayEmployees();
                break;
            case 'Add A Department':
                departmentTable.promptNewDepartment();
                break;
            case 'Add A Role':
                roleTable.promptNewRole();
                break;
            case 'Add An Employee':
                employeeTable.promptNewEmployee();
                break;
            case 'Update An Employee Role':
                console.log(action);
                break;
        }
    })
    // .finally(() => {
    //     setTimeout(promptUser, 500);
    // });
};
promptUser();