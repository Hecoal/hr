const morgan = require ('morgan');
const express = require ('express');
const app = express();

//Routes
const employees = require('./Routes/employees.js');
const users = require('./Routes/users.js');

//Middleware
const notFound = require('./Middleware/notFound.js');

app.use(morgan('dev'));
//Necesary to show the data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route uses
app.use('/user',users);
app.use('/employees', employees);

//Invalid url
app.use(notFound);

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});