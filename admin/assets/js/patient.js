displayDetails();
getallAppointments();

//get all appointments
function getallAppointments(){
    var xhr = new XMLHttpRequest();
    var pat = sessionStorage.getItem("admindata");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr.open('POST', baseUrl+"/admin/patients", true); 
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
                    var allappointments = '	<tr><td>'+response.data[i].fullname+'</td><td>'+response.data[i].email+'</td><td>'+response.data[i].phone+'</td><td>'+response.data[i].address+'</td></tr>';
                    $('#adminallappointments').prepend(allappointments);
                    //allappointment
                }
            }
        }
    }
    xhr.send('id='+id);  
    }


    function displayDetails(){
        var pat = sessionStorage.getItem("admindata");
        //to get the object we have to parse it.
        var patient = JSON.parse(pat);
        document.getElementById("welcomename").innerHTML = patient.fullname;
        document.getElementById("myemail").innerHTML = patient.email;
        document.getElementById("tatendamusodza").innerHTML = patient.fullname;
        }
        