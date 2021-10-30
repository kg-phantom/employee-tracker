const db = require('./db/connection');
const express = require('express');
const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./utils/queries');

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
                inquirer.prompt({
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
                    departmentTable.addDepartment(departmentName);
                })
                break;
            case 'Add A Role':
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
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is the department of the new role?',
                        //choices: []
                    },
                ])
                .then(({ title, salary, department }) => {
                    // if(roleTable.validateNewRole(title)) {
                    //     console.log('validated and added.');
                        roleTable.addRole(title, salary, department);
                //     }
                //     else {console.log('not added')}
                })
                break;
            case 'Add An Employee':
                console.log(action);
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
//console.log(departmentTable.getDepartments());
promptUser();