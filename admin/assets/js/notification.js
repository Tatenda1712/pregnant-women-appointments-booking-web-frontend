displayDetails();
document.getElementById('notificationform').addEventListener('submit', auth);
function auth(e) {
  var xhr = new XMLHttpRequest();
    e.preventDefault();
    var message = $('#notimessage').val();
    xhr.open('POST', baseUrl+"/admin/notifiation", true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(response.data === "done"){
              var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-success" role="alert"> Notification Sent</div>'
              $('#notificationform').prepend(incorrectCredentialsAlert);
              $('#notificationform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
            else{
               var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">Error Sending notification Please try again</div>'
              $('#notificationform').prepend(incorrectCredentialsAlert);
              $('#notificationform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
        }
    }
    xhr.send('message='+message);  

  }
  function displayDetails(){
var pat = sessionStorage.getItem("admindata");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
document.getElementById("myemail").innerHTML = patient.email;
document.getElementById("tatendamusodza").innerHTML = patient.fullname;
}