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
        document.querySelector('.btn-action').addEventListener('click',deleteEmp);

    }else{
        window.location.href='index.html';
    }
}

function deleteEmp(){
    var idEmployee= document.getElementById('input-id').value;
    
    var data={
            id:idEmployee,
    }
    axios.delete(url + '/employees/' + idEmployee, headers)
    .then(function(res){
        console.log(res);
        window.location.href('employees.html')
    }).catch(function(err){
        $('.alert-danger').show();
        console.log(err);
    });
}