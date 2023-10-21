const morgan = require ('morgan');
const express = require ('express');
const app = express();

//Routes
const employees = require('./Routes/employees.js');

//Middleware
const notFound = require('./Middleware/notFound.js');

app.use(morgan('dev'));

app.listen(3000, ()=>{
    console.log('Server is running');
});