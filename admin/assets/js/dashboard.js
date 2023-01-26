//calling functions

displayDetails();
numberAppointments();
getallAppointments();



function displayDetails(){
var pat = sessionStorage.getItem("admindata");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
document.getElementById("welcomename").innerHTML = patient.fullname;
document.getElementById("myemail").innerHTML = patient.email;
document.getElementById("tatendamusodza").innerHTML = patient.fullname;
}

function numberAppointments(){
var xhr = new XMLHttpRequest();
var pat = sessionStorage.getItem("admindata");
//to get the object we have to parse it.
var patient = JSON.parse(pat);
var id = patient.id;
xhr.open('POST', baseUrl+"/admin/totalappointments", true); 
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4){
        var response = JSON.parse(xhr.responseText);
        console.log(response.doctor);
        if(response.data === "none"){

        }
        else{
            document.getElementById("doctorcount").innerHTML=response.doctor;
            document.getElementById("usercounts").innerHTML=response.user;
            document.getElementById("appointmentscount").innerHTML=response.data;
            document.getElementById("waitingdatecount").innerHTML=response.booked;
        }
    }
}
xhr.send('id='+id);  
}

// //book an appointment
// function bookAppointment(){
//     document.getElementById('bookform').addEventListener('submit', book);
// function book(e) {
//   var book = new XMLHttpRequest();
//     e.preventDefault();
//     var pat = sessionStorage.getItem("userData");
//     //to get the object we have to parse it.
//     var patient = JSON.parse(pat);
//     var user_id = patient.id;
//     var email = $('#bookemail').val();
//     var fullname = $('#bookfullname').val();
//     var idnumber = $('#bookidnumber').val();
//     var phonenumber = $('#bookphone').val();
//     var reason = $('#bookreason').val();
//     var date = $('#bookdate').val();
//     var time = $('#booktime').val();
//     book.open('POST', baseUrl+"/user/createappointment", true); 
//     book.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     book.onreadystatechange = function(){
//         if(book.status === 200 && book.readyState === 4){
//             var response = JSON.parse(book.responseText);
//             if(response.data === "created"){
//                 var done = '<div  id = "myAlert" class="alert alert-success" role="alert">Appointment Booked waiting for the date to be given</div>'
//                 $('#bookform').prepend(done);
//                 $('#bookform').on('click', function(){
//                     $('#myAlert').remove();
//                 });
//                 window.location = "http://localhost:8080/appointmentsystem/patient/checkout.html";
//             }
//             else{
//               var error = '<div  id = "myAlert" class="alert alert-danger" role="alert">Error Booking your Appointment Try again</div>'
//               $('#bookform').prepend(error);
//               $('#bookform').on('click', function(){
//                   $('#myAlert').remove();
//               }); 
//             }
//         }
//     }
//     book.send('email='+email+'&user_id='+user_id+'&fullname='+fullname+'&idnumber='+idnumber+'&phonenumber='+phonenumber +'&reason='+reason+'&date='+date+'&time'+time);
//   }
// }

//get all appointments
function getallAppointments(){
    var xhr = new XMLHttpRequest();
    var pat = sessionStorage.getItem("admindata");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr.open('POST', baseUrl+"/admin/allappointments", true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(response.data === "none"){
                var error = '<div  id = "alert" class="alert alert-danger" role="alert">No Appointments Found</div>'
                $('#adminallappointments').prepend(error);
                $('#adminallappointments').on('click', function(){
                    $('#alert').remove();
                }); 
            }
            else{
                for(var i in response.data){
                    var allappointments = '	<tr><td>'+response.data[i].fullname+'</td><td>'+response.data[i].email+'</td><td>'+response.data[i].idnumber+'</td><td>$'+response.data[i].amount+'</td><td>'+response.data[i].appointdate+'</td><td>'+response.data[i].appointtime+'</td></tr>'
                    $('#adminallappointments').prepend(allappointments);
                    //allappointment
                }
            }
        }
    }
    xhr.send('id='+id);  
    }