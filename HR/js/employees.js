window.onload= init;
var headers ={};
var url='http://localhost:3000';

function init(){
    if(localStorage.getItem('token')){
        headers={
            headers:{
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }
        loadEmployees();

    }else{
        window.location.href='index.html';
    }
}

function loadEmployees(){
    axios.get(url + '/employees',headers)
    .then(function(res){
        displayEmployees(res.data.message);
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmployees(employees){
    var body= document.querySelector('body');
    for(var i =0; i<employees.length;i++){
        body.innerHTML +=`<h3> Name: ${employees[i].lastName} ${employees[i].name}, Phone Number: ${employees[i].phoneNumber}, Email:${employees[i].email}  </h3>`;
    }
}