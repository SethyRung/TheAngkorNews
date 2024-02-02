<?php
try {
    require_once("../config/connection.php");

    if (isset($_GET["id"]) && isset($_GET["offset"]) && isset($_GET["count"])) {
        $id = $_GET["id"];
        $offset = $_GET["offset"];
        $count = $_GET["count"];

        $data = array();
        $rs = $cn->query("SELECT id, title, img FROM tbl_menu WHERE status = 'Active' AND id=$id");
        if ($rs->num_rows) {
            $category = $rs->fetch_assoc();

            $subData = array();
            $rs2 = $cn->query("SELECT id, title, img, post_date FROM tbl_news WHERE status = 'Active' AND menu_id = $id ORDER BY post_date DESC LIMIT $offset, $count");
            if ($rs2->num_rows) {
                while ($row2 = $rs2->fetch_assoc())
                    $subData[] = $row2;
            }
        }

        $data = [
            "id" => $category["id"],
            "title" => $category["title"],
            "img" => $category["img"],
            "news" => $subData
        ];
        echo json_encode($data);
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
