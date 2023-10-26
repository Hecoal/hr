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
        document.querySelector('.btn-primary').addEventListener('click',addEmployee);

    }else{
        window.location.href='index.html';
    }
}

function addEmployee(){
    var name= document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address= document.getElementById('input-address').value;
    
    var postData={
            name:name,
            lastName:lastname,
            phoneNumber:phone,
            email:mail,
            address:address
    }
    axios.post(url + '/employees', postData, headers)
    .then(function(res){
        console.log(res);
        window.location.href='empoyees.html';
    }).catch(function(err){
        $('.alert-danger').show();
        console.log(err);
    });
}