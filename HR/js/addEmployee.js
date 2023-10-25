
function singin(){
    var name= document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address= document.getElementById('input-address').value;

    //Send data to server
    axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
            name:name,
            lastName:lastname,
            phoneNumber:phone,
            email:mail,
            address:address
        }
    }).then(function(res){
        console.log(res);
        $('.alert-success').show();
    }).catch(function(err){
        $('.alert-danger').show();
        console.log(err);
    });
}