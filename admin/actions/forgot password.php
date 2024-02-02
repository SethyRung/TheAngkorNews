<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    require "PHPMailer/src/PHPMailer.php";
    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/SMTP.php";

    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $email = $cn->real_escape_string($data["email"]);

        $rs = $cn->query("SELECT id, code, expire FROM tbl_user WHERE email='$email'");
        if ($rs->num_rows == 0)
            echo json_encode(["message" => "That address is either invalid, not associated with a personal user account."]);
        else {
            $user = $rs->fetch_assoc();
            if ($user["code"] == null  || $user["expire"] == null || $user["expire"] < time()) {
                $code = sprintf("%06d", mt_rand(1, 999999));
                $expire = time() + 120;

                $cn->query("UPDATE tbl_user SET code='$code', expire=$expire WHERE id={$user['id']}");

                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = "rungsethykh@gmail.com";
                $mail->Password = "bbhamfacwhqknnki";
                $mail->SMTPSecure = 'ssl';
                $mail->Port = 465;

                $mail->setFrom("rungsethykh@gmail.com", "AngkorNews");
                $mail->addAddress($email);

                $mail->isHTML(true);
                $mail->Subject = "$code is AngkorNews account recovery code";
                $mail->Body = "<p>Dear: User</p>
                                    <p>We received a request to reset your AngkorNews password. Enter the following password reset code:</p>
                                    <h4>$code</h4>";
                $mail->send();
                echo json_encode(["message" => "Please check your email for a message with your code. Your code is 6 numbers long.", "expire" => $expire]);
                // $headers = "MIME-Version: 1.0" . "\r\n";
                // $headers .= "Content-type:text/html; charset=UTF-8" . "\r\n";
                // $headers .= "From: Angkor News rungsethyhk@gmail.com" . "\r\n";
                // $subject = $code . "is Angkor News account recovery code";
                // $msg = "<html>
                //         <body>
                //             <p>Dear: User</p>
                //             <p>We received a request to reset your AngkorNews password. Enter the following password reset code:</p>
                //             <h4>$code</h4>
                //         </body>
                //     </html>";
                // if (mail($email, $subject, $msg, $headers, "-f rungsethyhk@gmail.com"))
                //     echo json_encode(["message" => "Please check your email for a message with your code. Your code is 4 numbers long."]);
                // else
                //     echo json_encode(["message" => "Sorry we cannot send recovery code to your email."]);
            } else echo json_encode(["message" => "We have sent a recovery code to your email.", "expire" => $user["expire"]]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Sorry we cannot send recovery code to your email."]);
}
