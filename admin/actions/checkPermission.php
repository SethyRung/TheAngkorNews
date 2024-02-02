<?php

try {
    require_once("../config/connection.php");

    if (isset($_GET["table_name"])) {
        $table_name = $_GET["table_name"];
        $email = $_SESSION["email"];
        $password = $_SESSION["password"];

        if ($table_name == "user") {
            $sql = "SELECT perUser AS permission";
        } else if ($table_name == "menu") {
            $sql = "SELECT perMenu AS permission";
        } else if ($table_name == "news") {
            $sql = "SELECT perNews AS permission";
        } else if ($table_name == "ads") {
            $sql = "SELECT perAds AS permission";
        } else throw ("Wrong table new");
        $sql = $sql . " FROM tbl_user WHERE email='$email' AND password='$password'";
        $rs = $cn->query($sql);
        echo json_encode(["permission" => $rs->fetch_assoc()["permission"]]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
