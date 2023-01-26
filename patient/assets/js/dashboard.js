




displayDetails();
getDoctors();
numberAppointments();
getallAppointments();
bookAppointment();
var doctorID;

function getDoctors(){
    var pat = sessionStorage.getItem("userData");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
var id = patient.id;
var xhr7 = new XMLHttpRequest();
xhr7.open('POST', baseUrl+"/admin/doctors", true); 
xhr7.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr7.onreadystatechange = function(){
    if(xhr7.status === 200 && xhr7.readyState === 4){
        var response = JSON.parse(xhr7.responseText);
        if(response.data === "none"){
            console.log("tatenda");
        }
        else{
        for(var i in response.data){
                var doctors ='<option id="optiondoctorID" value="'+response.data[i].id+'">'+response.data[i].fullname+'</option>';
                $('#doctorselect').prepend(doctors);
          //  document.getElementById("doctorselect").innerHTML=response.data[i].fullname;
          doctorID=response.data[i].id;
        }
        }
    }
}
xhr7.send('id='+id); 

}

function displayDetails(){
var pat = sessionStorage.getItem("userData");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
document.getElementById("patientName").innerHTML = patient.fullname;
document.getElementById("patientEmailAddress").innerHTML = patient.email;
}

function numberAppointments(){
var xhr = new XMLHttpRequest();
var pat = sessionStorage.getItem("userData");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
var id = patient.id;
xhr.open('POST', baseUrl+"/user/totalappointments", true); 
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4){
        var response = JSON.parse(xhr.responseText);
        if(response.data === "none"){

        }
        else{
            document.getElementById("totalappointments").innerHTML=response.data;
            document.getElementById("pendingappointments").innerHTML=response.unbooked;
            document.getElementById("completedappointments").innerHTML=response.booked;
        }
    }
}
xhr.send('id='+id);  
}

//book an appointment
function bookAppointment(){
document.getElementById('bookform').addEventListener('submit', book);
function book(e) {
  var books = new XMLHttpRequest();
    e.preventDefault();
    var pat = sessionStorage.getItem("userData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var user_id = patient.id;
    var email = $('#bookemail').val();
    var fullname = $('#bookfullname').val();
    var idnumber = $('#bookidnumber').val();
    var phonenumber = $('#bookphone').val();
    var reason = $('#bookreason').val();
    var dates = $('#bookdate').val();
    var times = $('#booktime').val();
    // console.log(user_id);
    //  console.log(email);
    //   console.log(fullname);
    //    console.log(idnumber);
    //     console.log(phonenumber);
    //      console.log(reason);
    //       console.log(dates);
    //        console.log(times);
    books.open('POST',baseUrl+"/user/createappointment", true); 
    books.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    books.onreadystatechange = function(){
        if(books.status === 200 && books.readyState === 4){
            var response = JSON.parse(books.responseText);
            console.log(response);
            if(response.data === "created"){
                var done = '<div  id = "myAlert" class="alert alert-success" role="alert">Appointment Booked waiting for the date to be given</div>'
                $('#bookform').prepend(done);
                $('#bookform').on('click', function(){
                    $('#myAlert').remove();
                });
                  sessionStorage.setItem("appid", JSON.stringify(response.appid));
                window.location = "http://localhost:8080/appointmentsystem/patient/checkout.html";
            }
            else{
              var error = '<div  id = "myAlert" class="alert alert-danger" role="alert">Error Booking your Appointment Try again</div>'
              $('#bookform').prepend(error);
              $('#bookform').on('click', function(){
                  $('#myAlert').remove();
              }); 
            }
        }
    }

    //books.send('email='+email+'&fullname='+fullname+'&idnumber='+idnumber+'&phonenumber='+phonenumber+'&reason='+reason+'&user_id='+user_id+'&dates='+dates+'&times='+times);
       books.send('email='+email+'&user_id='+ user_id +'&fullname='+ fullname +'&idnumber='+idnumber+'&phonenumber='+phonenumber +'&reason='+reason+'&dates='+dates+'&times='+times +'&doctor_id='+doctorID);
}
}

//get all appointments
function getallAppointments(){
    var xhr9 = new XMLHttpRequest();
    var pat = sessionStorage.getItem("userData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr9.open('POST', baseUrl+"/user/getallappointments", true); 
    xhr9.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr9.onreadystatechange = function(){
        if(xhr9.status === 200 && xhr9.readyState === 4){
            var response = JSON.parse(xhr9.responseText);
            if(response.data === "none"){
                var error = '<div  id = "alert" class="alert alert-danger" role="alert">No Appointments Found</div>'
                $('#appointments').prepend(error);
                $('#appointments').on('click', function(){
                    $('#alert').remove();
                }); 
            }
            else{
                for(var i in response.data){
                    var allappointments = '	<tr><td><h2 class="table-avatar">response.data[i].fullname</h2></td><td>response.data[i].email</td><td>response.data[i].idnumber</td><td>response.data[i].appointdate</td><td>response.data[i].id</td><td>response.data[i].status</td><td>response.data[i].pin</td></tr>'
                    $('#apointmentsdata').prepend(allappointments);
                    //allappointment
                }
            }
        }
    }
    xhr9.send('id='+id);  
    }