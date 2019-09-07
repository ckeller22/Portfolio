<?php

require 'vendor/autoload.php';

$myEmail = getenv("MY_EMAIL");

//sanitize and validate POST data
$errorMessage = "";

if (empty($_POST["name"])) {
    $errorMessage .= "Please enter a name. \n";
} else {
    $name = filter_var($_POST["name"]);
}
if (empty($_POST["email"]) || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $errorMessage .= "Please enter a valid email address. \n";   
} else {
    $email = filter_var($_POST["email"]);
}
if (empty($_POST["desc"])) {
    $errorMessage .= "Please tell me about your project. \n";
} else {
    $desc = filter_var($_POST["desc"]);
}

// if errorMessage length > 0, breaks and echos errormessage, otherwise sends mail
if (strlen($errorMessage) > 0) {
    echo $errorMessage;
} else {
    $from = new SendGrid\Email(null, $email);
    $subject = $name;
    $to = new SendGrid\Email(null, $myEmail);
    $content = new SendGrid\Content("text/plain", $desc);
    $mail = new SendGrid\Mail($from, $subject, $to, $content);

    $apiKey = getenv('SENDGRID_API_KEY');
    $sg = new \SendGrid($apiKey);

    try {
        $response = $sg->client->mail()->send()->post($mail);
        $JSONResponse = json_encode($response->statusCode());
        
        echo $JSONResponse;

    } catch (Exception $e) {
        echo 'Caught exception: '.  $e->getMessage(). "\n";
    }
}







?>