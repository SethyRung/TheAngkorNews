<?php
require_once("../config/connection.php");

if (isset($_SESSION["email"]) && isset($_SESSION["password"])) {
    $rs = $cn->query("SELECT * FROM tbl_user WHERE email='{$_SESSION["email"]}' AND password='{$_SESSION["password"]}'");
    if ($rs->num_rows == 0)
        echo json_encode(["isLoggedin" => false]);
    else echo json_encode(["isLoggedin" => true]);
} else {
    echo json_encode(["isLoggedin" => false]);
}
