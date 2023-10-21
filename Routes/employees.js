const express = require('express');
const employees = express.Router();
const db = require('../Config/database');


//Create a new Employee
employees.post("/", async(req,res,next)=>{
    const {name,lastName,phoneNumber, email, address} = req.body;
    //To check if every field is complete
    if(name && lastName && phoneNumber && email && address){
        let query = "INSERT INTO employees(name, lastName, phoneNumber, email, address)";
        //Insert data
        query+=` VALUES('${name}', '${lastName}', ${phoneNumber}, '${email}', '${address}')`;
    
        //This will let us know what has changed
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            //We receive the data from the post and we show it as JSON
            return res.status(201).json({code:201, message:'Employee Successfuly Inserted'});
        }
        return res.status(500).json({code:500, message:'An error ocurred!'});
    }
    return res.status(500).json({code:500, message:'Empty fields'});
});

//Delete a Pokemon from an ID
employees.delete("/:id([0-9]{1,3})",async(req,res,next)=>{
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;
    const rows= await db.query(query);

    if(rows.affectedRows==1){
        return res.status(200).json({code:200, message:'Employee Deleted Successfully '});
    }
    return res.status(404).json({code:404, message:'Employee Not Found!'});
});

//Update data from an employee
employees.put("/:id([0-9]{1,3})",async(req,res,next)=>{
    const {name,lastName,phoneNumber, email, address} = req.body;

    if(name && lastName && phoneNumber && email && address){

        let query = `UPDATE employees SET name='${name}',lastName='${lastName}',`;
        query+=`phoneNumber=${phoneNumber},email='${email}', address='${address}' WHERE id=${req.params.id}`;

        //This will let us know what has changed
        const rows= await db.query(query);
        if(rows.affectedRows==1){
            //We receive the data from the post and we show it as JSON
            return res.status(200).json({code:200, message:'Employee Successfuly Updated'});
        }
        return res.status(500).json({code:500, message:'An error ocurred!'});
    }
    return res.status(500).json({code:500, message:'Empty Fields'});
});

//Show all employees in root (localhost:3000/employees)
employees.get('/', async(req,res,next)=>{
    const emp= await db.query('SELECT * FROM employees');
    return res.status(200).json({code:1,message:emp})
});

//Find employees by their ID
employees.get('/:id([0-9]{1,3})',async(req,res,next)=>{
    const id = req.params.id;
    if(id>=1 && id<=722){
        const emp= await db.query("SELECT * FROM employees WHERE id="+id+";");
        return res.status(200).json({code:200,message:emp});
    }
    return res.status(404).send({code:404, message:'Empoyee not found'});
});

//Find employees by their name
employees.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE name='"+ name+"';");
    if(emp.length>0){
        return res.status(200).json({code:200,message:emp});
    }
    return res.status(404).send({code:404, message:'Employee not found'});

});

module.exports=employees;