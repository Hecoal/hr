window.onload=init;

function init(){
    if(!localStorage.getItem('token')){
        document.querySelector('.btn-secondary').addEventListener('click',function(){
        window.location.href = 'login.html';
        });
        document.querySelector('.btn-primary').addEventListener('click',singin);
    }
    else{
        window.location.href='employees.html';
    }
    
}

function singin(){
    var name= document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;

    //Send data to server
    axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
            name:name,
            mail:mail,
            password:password
        }
        //If the login is correct, we redirect to pokedex.html
    }).then(function(res){
        console.log(res);
        alert('Success');
        window.location.href='login.html';
    }).catch(function(err){
        console.log(err);
    });
}
