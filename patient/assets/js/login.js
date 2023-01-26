
document.getElementById('loginform').addEventListener('submit', auth);
function auth(e) {
  var xhr = new XMLHttpRequest();
    e.preventDefault();
    var password = $('#password').val();
    var email = $('#email').val();
    xhr.open('POST', baseUrl+"/user/auth", true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(response.data === "failed"){
              var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">Incorrect Credentials</div>'
              $('#loginform').prepend(incorrectCredentialsAlert);
              $('#loginform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
            else{
            sessionStorage.setItem("userData", JSON.stringify(response.data));
              window.location = "http://localhost:8080/appointmentsystem/patient/patient-dashboard.html";
            }
        }
    }
    xhr.send('email='+email+'&password='+password);  

  }