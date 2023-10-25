const express = require('express');
const jwt = require('jsonwebtoken');
const users = express.Router();
const db = require('../Config/database');

//Signup a new user
users.post('/signin',async(req,res,next)=>{
    const {userName, mail, password}=req.body;
    if(userName && mail && password){
        let query = 'INSERT INTO users( userName, mail, password) ';
        query+=`VALUES ('${userName}','${mail}','${password}');`;

        const rows = await db.query(query);
        if(rows.affectedRows==1){
             return res.status(201).json({code:201, message:'User registered successfully'});
        }
        return res.status(500).json({code:500, message:'Something went wrong'});
    }
    return res.status(500).json({code:500, message:'Empty fields'});
    
});

//Login
users.post('/login', async (req, res, next)=>{
    const {mail,password}=req.body;
    const query= `SELECT * FROM users WHERE mail='${mail}' AND password = '${password}';`;
    const rows=await db.query(query);

    if(mail && password){
        if(rows.length ==1){
            const token = jwt.sign({
                id:rows[0].id,
                mail: rows[0].mail
            },'debugkey');
            return res.status(200).json({code:200, message:token});
    
        }else{
            return res.status(401).json({code:401, message:'User / password incorrect'})
        }
    }
    return res.status(500).json({code:500, message:'Empty fields'})
});

//Show every user
users.get('/',async (req,res,next)=>{
    const query = 'SELECT * FROM users';
    const rows = await db.query(query);

    return res.status(200).json({code:200, message: rows});
});

module.exports=users;