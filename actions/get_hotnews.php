<?php
try {
    require_once("../config/connection.php");

    $data = array();
    $rs = $cn->query("SELECT id, title, img, post_date FROM tbl_news WHERE status = 'Active' ORDER BY post_date DESC LIMIT 4");
    if ($rs->num_rows) {
        while ($row = $rs->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}