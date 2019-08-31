<?
$name = $_POST['name'];
$from = $_POST["email"];
$message = $_POST["description"];
$to = "chriskeller222@gmail.com";
$subject = "portfolio contact";

$headers = 'From: <$from>' . "\r\n";

mail($to, $subject, $message);

?>