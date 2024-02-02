<?php
try {
    require_once("../config/connection.php");
    if (isset($_GET["searchData"])) {
        $searchData = $_GET["searchData"];
        
        $data = array();
        $total = 0;
        $rs2 = $cn->query("SELECT COUNT(id) FROM tbl_news WHERE status = 'Active' AND title LIKE '%$searchData%'");
        if ($rs2->num_rows) {
            $total = ($rs2->fetch_array())[0];
        }

        echo json_encode($total);
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
