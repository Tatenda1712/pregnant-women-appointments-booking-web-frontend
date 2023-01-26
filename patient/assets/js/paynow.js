payNow();



function payNow(){
    document.getElementById('payform').addEventListener('submit', auth);
function auth(e) {
  var xhr = new XMLHttpRequest();
    e.preventDefault();
    var phone = $('#payingphone').val();
    var method = "ecocash";
    var amount = 100;
    xhr.open('POST', paynowURL, true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            if(!response.state === "failed"){
              var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">error</div>'
              $('#payform').prepend(incorrectCredentialsAlert);
              $('#payform').on('click', function(){
                  $('#myAlert').remove();
              });
            }
            else{
  var xhr1 = new XMLHttpRequest();
  var pat = sessionStorage.getItem("appid");
  //to get the object we have to parse it.
  var patient = JSON.parse(pat);
  var id = patient.id;
    xhr1.open('POST', baseUrl+"/user/updatepayment", true); 
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr1.onreadystatechange = function(){
        if(xhr1.status === 200 && xhr1.readyState === 4){
            var response = JSON.parse(xhr1.responseText);
            if(response.data === "done"){
                var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-success" role="alert">Payment Success</div>'
                $('#payform').prepend(incorrectCredentialsAlert);
                $('#payform').on('click', function(){
                    $('#myAlert').remove();
                });
            }
            else{

                var incorrectCredentialsAlert = '<div  id = "myAlert" class="alert alert-danger" role="alert">Error</div>'
                $('#loginform').prepend(incorrectCredentialsAlert);
                $('#loginform').on('click', function(){
                    $('#myAlert').remove();
                });
            }
        }
    }
    xhr1.send('id='+id);  

  }
            }
        }
         xhr.send('phone='+phone+'&method='+method+'&amount='+amount);  
    }
   

  }

    