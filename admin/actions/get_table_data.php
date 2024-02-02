<?php

try {
    require_once("../config/connection.php");

    if (isset($_GET["from"]) and isset($_GET["offset"]) and isset($_GET["count"])) {
        $from = $_GET["from"];
        $offset = $_GET["offset"];
        $count = $_GET["count"];
        $data = array();

        if ($from == "user") {
            $rs = $cn->query("SELECT id, username, email, userType, perUser, perMenu, perNews, perAds, isActivated FROM tbl_user LIMIT $offset, $count");
        } else if ($from == "menu") {
            $rs = $cn->query("SELECT * FROM tbl_menu ORDER BY od DESC LIMIT $offset, $count");
        } else if ($from == "news") {
            $rs = $cn->query("SELECT tbl_news.id, tbl_menu.id as menu_id, tbl_menu.title AS menu, tbl_news.title, tbl_news.img, tbl_news.od, click, tbl_news.status FROM tbl_news INNER JOIN tbl_menu ON tbl_news.menu_id = tbl_menu.id ORDER BY post_date DESC LIMIT $offset, $count");
        } else if ($from == "ads") {
            $rs = $cn->query("SELECT * FROM tbl_ads ORDER BY od DESC LIMIT $offset, $count");
        }
    }
    if ($rs->num_rows) {
        while ($row = $rs->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
