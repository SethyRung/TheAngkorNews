<?php
try {
    require_once("../config/connection.php");

    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $rs = $cn->query("SELECT des FROM tbl_news WHERE id=$id");
        echo json_encode($row = $rs->fetch_assoc());
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
