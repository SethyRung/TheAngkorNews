<?php

try {
    require_once("../config/connection.php");

    if (isset($_GET["from"])) {
        $from = $_GET["from"];

        if ($from == "user" || $from == "menu" || $from == "news" || $from == "ads") {
            $rs = $cn->query("SELECT COUNT(id) AS totalRecord FROM tbl_$from");
            $data = $rs->fetch_assoc()["totalRecord"];
            echo json_encode(["totalRecord" => $data]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
