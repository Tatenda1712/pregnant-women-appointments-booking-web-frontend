displayDetails();
getallAppointments();
checkinUser();

var appointmentid='';
//get all appointments
function getallAppointments(){
    var xhr = new XMLHttpRequest();
    var pat = sessionStorage.getItem("doctorData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr.open('POST', baseUrl+"/doctor/getpendingappointments", true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(response.data === "none"){
                var error = '<div  id = "alert" class="alert alert-danger" role="alert">No Appointments Found</div>'
                $('#appointments').prepend(error);
                $('#appointments').on('click', function(){
                    $('#alert').remove();
                }); 

            }
            else{
                for(var i in response.data){
                    appointmentid=response.data[i].id;
                    var allappointments = '	<tr><td><h2 class="table-avatar">'+ response.data[i].fullname +'</h2></td><td>'+response.data[i].email +'</td><td>'+response.data[i].idnumber+'</td><td>'+response.data[i].appointdate+'</td><td>$'+response.data[i].amount+'</td><td>'+response.data[i].status+'</td></tr>'
                    $('#allappointment').prepend(allappointments);
                    
                    console.log(appointmentid);
                }
            }
        }
    }
    xhr.send('id='+id);  
    }

    function displayDetails(){
        var pat = sessionStorage.getItem("doctorData");
        //to get the object we have to parse it.
        var patient = JSON.parse(pat);
        document.getElementById("patientName").innerHTML = patient.fullname;
        document.getElementById("patientEmailAddress").innerHTML = patient.email;
        }

//check in user

function checkinUser(){
    
document.getElementById('checkinform').addEventListener('submit', auth);
function auth(e) {
  var xhr1 = new XMLHttpRequest();
    e.preventDefault();
    var pin = $('#chekinpin').val();
    var doccomment = $('#doccomment').val();
    console.log(doccomment);
    var pat = sessionStorage.getItem("doctorData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
        console.log(id);
    xhr1.open('POST', baseUrl+"/doctor/acceptuser", true); 
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function(){
        if(xhr1.status === 200 && xhr1.readyState === 4){
            var response = JSON.parse(xhr1.responseText);
            if(response.data === "done"){
              var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-success" role="alert">Patient Successully Checked in</div>'
              $('#checkinform').prepend(incorrectCredentialsAlert);
              $('#checkinform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
            else{
           var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">Incorrect Pin</div>'
              $('#checkinform').prepend(incorrectCredentialsAlert);
              $('#checkinform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
        }
    }
    xhr1.send('id='+id+'&pin='+pin+'&doccomment='+doccomment);  

  }
}