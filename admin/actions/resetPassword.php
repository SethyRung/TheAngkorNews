<?php
try {
    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $email = $cn->real_escape_string($data["email"]);
        $password = $password = md5(md5($email) . $cn->real_escape_string($data["password"]));
        $code = $data["code"];

        if ($code != null) {
            $rs = $cn->query("SELECT * FROM tbl_user WHERE email = '$email' AND code='$code'");
            if ($rs->num_rows) {
                $rs = $cn->query("UPDATE tbl_user SET password='$password', code=null, expire=null, isActivated='true' WHERE email='$email'");
                if ($rs == true)
                    echo json_encode(["message" => "Your password has been reset."]);
                else echo json_encode(["message" => "There was an error resetting your password. Please try again later."]);
            } else echo json_encode(["message" => "There was an error resetting your password. Please try again later."]);
        } else echo json_encode(["message" => "There was an error resetting your password. Please try again later."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
