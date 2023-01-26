
displayDetails();
changePassword();

function displayDetails(){
    var pat = sessionStorage.getItem("userData");
    //to get the object we have to parse it.
       var patient = JSON.parse(pat);
       document.getElementById("patientName").innerHTML = patient.fullname;
       document.getElementById("patientEmailAddress").innerHTML = patient.email;
    }

function changePassword(){
    document.getElementById('formChangePassword').addEventListener('submit', auth);
    function auth(e) {
    var xhr = new XMLHttpRequest();
        e.preventDefault();
        var pat = sessionStorage.getItem("userData");
        //to get the object we have to parse it.
        var patient = JSON.parse(pat);
        var id = patient.id;
        var oldpassword = $('#oldpassword').val();
        var newpassword = $('#newpassword').val();
        xhr.open('POST', baseUrl+"/user/changepassword", true); 
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(){
            console.log(xhr.readyState);
            if(xhr.status === 200 && xhr.readyState === 4){
                var response = JSON.parse(xhr.responseText);
                if(response.data === "incorrect password"){
                var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">Incorrect Password</div>'
                $('#formChangePassword').prepend(incorrectCredentialsAlert);
                $('#formChangePassword').on('click', function(){
                    $('#myAlert').remove();
                });
                }
                else{
                    var changed = '<div  id = "myAlert" class="alert alert-success" role="alert">Password Successfully Changed</div>'
                    $('#formChangePassword').prepend(changed);
                    $('#formChangePassword').on('click', function(){
                        $('#myAlert').remove();
                    });
                }
            }
        }
        xhr.send('oldpassword='+oldpassword+'&newpassword='+newpassword);  

    }
}