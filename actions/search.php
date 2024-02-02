<?php
try {
    require_once("../config/connection.php");
    if (isset($_GET["searchData"]) && isset($_GET["offset"]) && isset($_GET["count"])) {
        $searchData = $_GET["searchData"];
        $offset = $_GET["offset"];
        $count = $_GET["count"];
        $data = array();
        $rs = $cn->query("SELECT id, title, img, post_date FROM tbl_news WHERE status = 'Active' AND title LIKE '%$searchData%' LIMIT $offset, $count");
        if ($rs->num_rows) {
            while ($row = $rs->fetch_assoc()) {
                $data[] = $row;
            }
        }
        echo json_encode($data);
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
