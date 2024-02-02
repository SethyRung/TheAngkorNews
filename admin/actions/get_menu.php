<?php
try {
    require_once("../config/connection.php");

    $data = array();
    $rs = $cn->query("SELECT id, title FROM tbl_menu WHERE status = 'Active' ORDER BY od DESC");
    if ($rs->num_rows) {
        while ($row = $rs->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
