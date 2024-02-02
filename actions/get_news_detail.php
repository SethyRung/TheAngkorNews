<?php
try {
    require_once("../config/connection.php");
    if (isset($_GET["id"])) {
        $id = intval($_GET["id"]);
        $data = array();
        $rs = $cn->query("SELECT * FROM tbl_news WHERE status = 'Active' AND id=$id");
        if ($rs->num_rows) {
            $row = $rs->fetch_assoc();
            echo json_encode($row);
        }
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
