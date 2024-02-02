<?php

try {
    require_once("../config/connection.php");

    if (isset($_GET["from"])) {
        $from = $_GET["from"];
        $id = 0;

        if ($from == "user" || $from == "menu" || $from == "news" || $from == "ads") {
            $rs = $cn->query("SELECT id FROM tbl_$from ORDER BY id DESC");
            if ($rs->num_rows) {
                $id = $rs->fetch_array()["id"];
            }
        }
        echo json_encode(["id" => (int)++$id]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
