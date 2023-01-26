
document.getElementById('registerform').addEventListener('submit', auth);
function auth(e) {
  var xhr = new XMLHttpRequest();
    e.preventDefault();
    var fullname = $('#regfullname').val();
    var email = $('#regemail').val();
    var phone = $('#regphone').val();
    var password = $('#regpassword').val();
    var address = $('#regaddress').val();
    xhr.open('POST', baseUrl+"/user/register", true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(response.data === "registered"){
              window.location = "http://localhost:8080/appointmentsystem/patient/login.html";
            }
            else{
              var error = '<div  id = "myAlert" class="alert alert-danger" role="alert">We have encountered an error. Please try again</div>'
              $('#registerform').prepend(error);
              $('#registerform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
        }
    }
    xhr.send('email='+email+'&password='+password+'&fullname='+fullname+'&phone='+phone+'&address='+address);  

  }