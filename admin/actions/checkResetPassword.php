<?php
try {
    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $email = $cn->real_escape_string($data["email"]);
        $code = $cn->real_escape_string($data["code"]);

        $rs = $cn->query("SELECT id FROM tbl_user WHERE email='$email' AND code='$code'");
        if ($rs->num_rows)
            echo (json_encode(["isResetAble" => true]));
        else echo (json_encode(["isResetAble" => false]));
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
