window.onload=init;

function init(){
    if(!localStorage.getItem('token')){
        document.querySelector('.btn-secondary').addEventListener('click',function(){
        window.location.href = 'signin.html';
        });
        document.querySelector('.btn-primary').addEventListener('click',login);
    }else{
        window.location.href='employees.html';
    }
    
}

function login(){
    //Get data from inputs
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;

    //Send data to server
    axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
            mail:mail,
            password:password
        }
        //If the login is correct:
    }).then(function(res){
        if (res.data.code ===200){
            localStorage.setItem('token', res.data.message);
            window.location.href='employees.html';
        }else{
            alert('Unsuccesuful login');
        }
    }).catch(function(err){
        console.log(err);
    });
}
