displayDetails();
getallAppointments();


//get all appointments
function getallAppointments(){
    var xhr = new XMLHttpRequest();
    var pat = sessionStorage.getItem("userData");
    //to get the object we have to parse it.
    var patient = JSON.parse(pat);
    var id = patient.id;
    xhr.open('POST', baseUrl+"/user/getbookedappointments", true); 
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
                console.log(response.data)
                for(var i in response.data){
                    var allappointments = '	<tr><td><h2 class="table-avatar">'+ response.data[i].fullname +'</h2></td><td>'+response.data[i].email +'</td><td>'+response.data[i].idnumber+'</td><td>'+response.data[i].appointdate+'</td><td>$'+response.data[i].amount+'</td><td>'+response.data[i].doccomment+'</td><td>'+response.data[i].status+'</td><td>'+response.data[i].pin+'</td></tr>'
                    $('#allappointment').prepend(allappointments);
                    //allappointment
                }
            }
        }
    }
    xhr.send('id='+id);  
    }

    function displayDetails(){
        var pat = sessionStorage.getItem("userData");
        //to get the object we have to parse it.
        var patient = JSON.parse(pat);
        document.getElementById("patientName").innerHTML = patient.fullname;
        document.getElementById("patientEmailAddress").innerHTML = patient.email;
        }