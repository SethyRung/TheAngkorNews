<?php
try {
    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $email = $cn->real_escape_string($data["email"]);
        $code = $cn->real_escape_string($data["code"]);
        $now = time();
        $rs = $cn->query("SELECT id, code, expire FROM tbl_user WHERE email='$email'");
        $user = $rs->fetch_assoc();
        if ($user["code"] != null  && $user["expire"] != null && $user["expire"] > $now) {
            if ($code = $user["code"] && $now < $user["expire"])
                echo json_encode(["message" => "Success"]);
            else
                echo json_encode(["message" => "The number you entered doesn't match your code. Please try again."]);
        } else echo json_encode(["message" => "Session timed out."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
