const db = require('./db/connection');
//const apiRoutes = require('./routes/apiRoutes');
const express = require('express');
const inquirer = require('inquirer');

const { Department, Role, Employee } = require('./utils/queries');
// const displayDepartments = require('./utils/department');
// const displayRoles = require('./utils/role');
// const displayEmployees = require('./utils/employee');
//const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Use apiRoutes
// app.use('/api', apiRoutes);

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
                var tableDepartment = new Department('department');
                tableDepartment.displayDepartments();
                break;
            case 'View All Roles':
                var tableRole = new Role('role');
                tableRole.displayRoles();
                break;
            case 'View All Employees':
                var tableEmployee = new Employee('employee');
                tableEmployee.displayEmployees();
                break;
            case 'Add A Department':
                inquirer.prompt({
                        type: 'input',
                        name: 'departmentName',
                        message: 'What is the name of the new department?'
                })
                .then(({ departmentName }) => {
                    var tableDepartment = new Department('department');
                    console.log(departmentName);
                    tableDepartment.addDepartment(departmentName);
                })
                break;
            case 'Add A Role':
                console.log(action);
                break;
        }
    })
    //.finally(promptUser);
};

promptUser();