const morgan = require ('morgan');
const express = require ('express');
const app = express();

//Routes
const employees = require('./Routes/employees.js');
const users = require('./Routes/users.js');

//Middleware
const auth = require('./Middleware/auth.js');
const notFound = require('./Middleware/notFound.js');
const index = require('./Middleware/index.js');
const cors = require('./Middleware/cors.js');

app.use(cors);
app.use(morgan('dev'));
//Necesary to show the data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',index );
//Route uses
app.use('/users',users);
app.use(auth);
app.use('/employees', employees);

//Invalid url
app.use(notFound);

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});