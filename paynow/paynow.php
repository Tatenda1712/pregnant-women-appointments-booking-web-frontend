<?php
    require_once 'vendor/autoload.php';
    // database connection and table name
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'database.php';
// instantiate database and product object
// $database = new Database();
// $db = $database->getConnection();


$paying_phone = $_POST["phone"];
$paymethod= $_POST["method"];
$amount= $_POST["amount"];


    $paynow = new Paynow\Payments\Paynow(
        '14773',
        '2f0d0499-dd3c-43fc-84e5-b4bf5ae144fc',
        'http://example.com/gateways/paynow/update',
    
        // The return url can be set at later stages. You might want to do this if you want to pass data to the return url (like the reference of the transaction)
        'http://example.com/return?gateway=paynow'
    );
    $payment = $paynow->createPayment('Appointment', "musodzatatenda@gmail.com");
    // Passing in the name of the item and the price of the item
$payment->add("appointment",$amount);

// Save the response from paynow in a variable
$response = $paynow->sendMobile($payment, $paying_phone, $paymethod);
//$onemoneyResponse = $paynow->sendMobile($payment, '0717162963', 'onemoney');
$status="";
if($response->success()) {
    // Get the poll url (used to check the status of a transaction). You might want to save this in your DB
    $pollUrl = $response->pollUrl();
    $status = $paynow->pollTransaction($pollUrl);
    if($status->paid()) {

        $return = new stdClass();

        $return->state = "done";
        $return->pollurl=$pollUrl;
        // Yay! Transaction was paid for
        print(json_encode($return) ) ;
    } else {
        $return = new stdClass();
        $return->state = "failed";
        print(json_encode($return) ) ;
    }
    // Get the instructions
    // $instrutions = $response->instructions();
    // echo $instrutions;
}else{
    echo json_encode($response ) ;
}
// Check the status of the transaction with the specified pollUrl
// Now you see why you need to save that url ;-)
// $status = $paynow->pollTransaction($pollUrl);

// if($status->paid()) {
//     // Yay! Transaction was paid for
// } else {
//     print("Why you no pay?");
// }
?>