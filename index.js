const express = require ('express');
const app = express();

app.get('/',(req,res,next)=>{
    res.status(200);
    res.send('WELCOME');
});

app.listen(3000, ()=>{
    console.log('Server is running');
});