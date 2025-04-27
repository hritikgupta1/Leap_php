<?php
require 'vendor/autoload.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$mail->SMTPDebug = 2; // ← this enables the output
$mail->Debugoutput = 'html'; // show SMTP logs in browser

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $mobile = $data['Mobile'] ?? '';
    $message = $data['message'] ?? '';

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contactinfo353@gmail.com';
        $mail->Password = 'iujp qspl vqww uvke'; // Use correct Gmail app password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('contactinfo353@gmail.com', 'Contact Info');
        $mail->addAddress("info@lillyevents.in", "Lilly Events");
        $mail->Subject = 'New Contact Form Submission from $name';
        $mail->Body = "Name: $name\nEmail: $email\nMobile: $mobile\nMessage:\n$message";

        $mail->send();
        echo json_encode(["message" => "Message sent successfully!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error sending message"]);
    }
}
