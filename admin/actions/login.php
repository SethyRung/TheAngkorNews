<?php
require_once("../config/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);
    $email = $cn->real_escape_string($data["email"]);
    $password = $data["password"];
    $encrypt_password = md5(md5($email) . $password);

    $rs = $cn->query("SELECT * FROM tbl_user WHERE email='$email' AND password='$encrypt_password'");
    if ($rs->num_rows == 0)
        echo json_encode(["LoginStatus" => false]);
    else {
        $_SESSION["email"] = $email;
        $_SESSION["password"] = $encrypt_password;
        $arr = $rs->fetch_assoc();
        if ($arr["isActivated"] == "true")
            echo json_encode(["LoginStatus" => true]);
        else
            echo json_encode(["LoginStatus" => false, "isActivated" => false]);
    }
}
