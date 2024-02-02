<?php
try {
    require_once("../config/connection.php");
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $data = array();
        $rs = $cn->query("SELECT COUNT(id) FROM tbl_news WHERE status = 'Active' AND menu_id = $id");
        if ($rs->num_rows) {
            $total = ($rs->fetch_array())[0];
        }

        echo json_encode($total);
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
