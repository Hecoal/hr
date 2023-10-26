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
        document.querySelector('.btn-primary').addEventListener('click',modifyEmployee);

    }else{
        window.location.href='index.html';
    }
}

function modifyEmployee(){
    var employeeId = document.getElementById('input-id').value;
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
    axios.put(url + '/employees/'+ employeeId, postData, headers)
    .then(function(res){
        console.log(res);
        $('.alert-success').show();
    }).catch(function(err){
        $('.alert-danger').show();
        console.log(err);
    });
}