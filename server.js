const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const express = require('express');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if(err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

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