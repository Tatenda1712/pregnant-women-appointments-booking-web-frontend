//calling functions

displayDetails();
numberAppointments();
//getallAppointments();
sentNotification();

function numberAppointments(){
    var xhr1 = new XMLHttpRequest();
    var pat = sessionStorage.getItem("userData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr1.open('POST', baseUrl+"/doctor/totalappointments", true); 
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function(){
        if(xhr1.status === 200 && xhr1.readyState === 4){
            var response = JSON.parse(xhr1.responseText);
            if(response.data === "none"){
    
            }
            else{
                document.getElementById("totalappointments").innerHTML=response.data;
                document.getElementById("pendingappointments").innerHTML=response.unbooked;
                document.getElementById("completedappointments").innerHTML=response.booked;
            }
        }
    }
    xhr1.send('id='+id);  
    }

function displayDetails(){
var pat = sessionStorage.getItem("doctorData");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
document.getElementById("patientName").innerHTML = patient.fullname;
document.getElementById("patientEmailAddress").innerHTML = patient.email;
}

function numberAppointments(){
var xhr2 = new XMLHttpRequest();
var pat = sessionStorage.getItem("doctorData");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
var id = patient.id;
xhr2.open('POST', baseUrl+"/doctor/totalappointments", true); 
xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr2.onreadystatechange = function(){
    if(xhr2.status === 200 && xhr2.readyState === 4){
        var response = JSON.parse(xhr2.responseText);
        if(response.data === "none"){

        }
        else{
            document.getElementById("totalappointments").innerHTML=response.data;
            document.getElementById("pendingappointments").innerHTML=response.unbooked;
            document.getElementById("completedappointments").innerHTML=response.booked;
        }
    }
}
xhr2.send('id='+id);  
}

// //get all appointments
// function getallAppointments(){
//     var xhr3 = new XMLHttpRequest();
//     var pat = sessionStorage.getItem("doctorData");
//     //to get the object we have to parse it.
//     var patient = JSON.parse(pat);
//     var id = patient.id;
//     xhr3.open('POST', baseUrl+"/doctor/getallapointments", true); 
//     xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr3.onreadystatechange = function(){
//         if(xhr3.status === 200 && xhr3.readyState === 4){
//             var response = JSON.parse(xhr3.responseText);
//             if(response.data === "none"){
//                 var error = '<div  id = "alert" class="alert alert-danger" role="alert">No Appointments Found</div>'
//                 $('#appointments').prepend(error);
//                 $('#appointments').on('click', function(){
//                     $('#alert').remove();
//                 }); 
//             }
//             else{
//                 for(var i in response.data){
//                     var allappointments = '   <tr><td><h2 class="table-avatar">'+ response.data[i].fullname +'</h2></td><td>'+response.data[i].email +'</td><td>'+response.data[i].idnumber+'</td><td>'+response.data[i].appointdate+'</td><td>$'+response.data[i].amount+'</td><td>'+response.data[i].status+'</td></tr>'
//                     $('#allappointment').prepend(allappointments);
//                     //allappointment
//                 }
//             }
//         }
//     }
//     xhr3.send('id='+id);  
//     }
function sentNotification(){
    document.getElementById('notificationform').addEventListener('submit', auth);
function auth(e) {
        var pat = sessionStorage.getItem("doctorData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
  var xhr = new XMLHttpRequest();
    e.preventDefault();
    var message = $('#notimessage').val();
    xhr.open('POST', baseUrl+"/doctor/notifiation", true); 
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
    xhr.send('message='+message+'&id='+id);  

  }
}