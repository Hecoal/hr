window.onload=init;
var headers ={};
var url='http://localhost:3000';

function init(){
    if(localStorage.getItem('token')){
        headers={
            headers:{
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }
        document.querySelector('.btn-primary').addEventListener('click',searchEmp);

    }else{
        window.location.href='index.html';
    }
}

function searchEmp(){
    var employeeName= document.getElementById('input-name').value;
    
    var data={
            name:employeeName,
    }
    axios.get(url + '/employees/' + employeeName, headers)
    .then(function(res){
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function(err){
        $('.alert-danger').show();
        console.log(err);
    });
}
function displayEmployees(employees){
    var body= document.getElementById('results');
    for(var i =0; i<employees.length;i++){
        body.innerHTML +=`<h3> Id: ${employees[i].id} </h3>`;
        body.innerHTML +=`<h3> Name: ${employees[i].lastName} ${employees[i].name} </h3>`;
        body.innerHTML +=`<br>`;
        body.innerHTML +=`<h3> Phone Number: ${employees[i].phoneNumber}</h3>`;
        body.innerHTML +=`<br>`;
        body.innerHTML +=`<h3> Email:${employees[i].email} </h3>`;
        body.innerHTML +=`<hr>`;
         
    }   
}