# Employee Tracker
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

## Description
A tracker app that allows the user to view and manage their business's departments, roles, and employees so that they can organize and plan their company.

![Note Taker Homepage Screenshot](assets/images/note-taker-home-sc.PNG)

![Note Taker Notes Screenshot](assets/images/note-taker-notes-sc.PNG)

## Table of Contents
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Routes](#routes)
* [License](#license)
* [Questions](#questions)

## Demo
[Click here](https://mysterious-savannah-48786.herokuapp.com) to watch a demo of the application.

## Installation
1. Install [Node.js](https://nodejs.org/en/) if you haven't already.
2. Clone this repository onto your computer.
3. Navigate to the root of this repository on the command line.
4. Run `npm install` on the command line.
5. Run the following commands on the command line one at a time to install the necessary packages:
```
npm install express;
npm install --save mysql2;
npm install console.table --save;
```

## Usage
1. 

## Routes
This application utilizes multiple routes:
- GET `/api/departments` to display the departments table.
- GET `/api/roles` to display the role table.
- GET `/api/employees` to display the employee table.

- GET `/notes`: Retrieves the previously saved notes.
- POST `/notes`: Creates a new note and saves it.
- DELETE `/notes`: Deletes a note.

## License
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

## Questions
- [GitHub](https://github.com/kg-phantom)