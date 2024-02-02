<?php

try {
    require_once("../config/connection.php");

    if (isset($_GET["table"]) && isset($_GET["by"]) && isset($_GET["searchData"]) && isset($_GET["offset"]) && isset($_GET["count"])) {
        $table = $_GET["table"];
        $by = $_GET["by"];
        $searchData = $_GET["searchData"];
        $offset = $_GET["offset"];
        $count = $_GET["count"];

        if ($table == "menu") {
            if ($by == "id") {
                $sql = "SELECT * FROM tbl_menu WHERE tbl_menu.id = '$searchData'";
                $total_sql = "SELECT id FROM tbl_menu WHERE tbl_menu.id = '$searchData'";
            } else if ($by == "title") {
                $sql = "SELECT * FROM tbl_menu WHERE tbl_menu.title LIKE '%$searchData%' LIMIT $offset, $count";
                $total_sql = "SELECT id FROM tbl_menu WHERE tbl_menu.title LIKE '%$searchData%'";
            }
        } else if ($table == "news") {
            if ($by == "id") {
                $sql = "SELECT tbl_news.id, tbl_menu.id as menu_id, tbl_menu.title AS menu, tbl_news.title, tbl_news.img, tbl_news.od, click, tbl_news.status FROM tbl_news INNER JOIN tbl_menu ON tbl_news.menu_id = tbl_menu.id WHERE tbl_news.id = '$searchData'";
                $total_sql = "SELECT id FROM tbl_news WHERE tbl_news.id = '$searchData'";
            } else if ($by == "title") {
                $sql = "SELECT tbl_news.id, tbl_menu.id as menu_id, tbl_menu.title AS menu, tbl_news.title, tbl_news.img, tbl_news.od, click, tbl_news.status FROM tbl_news INNER JOIN tbl_menu ON tbl_news.menu_id = tbl_menu.id WHERE tbl_news.title LIKE '%$searchData%' LIMIT $offset, $count";
                $total_sql = "SELECT id FROM tbl_news WHERE tbl_news.title LIKE '%$searchData%'";
            }
        } else if ($table == "ads") {
            if ($by == "id") {
                $sql = "SELECT * FROM tbl_ads WHERE tbl_ads.id = '$searchData'";
                $total_sql = "SELECT id FROM tbl_ads WHERE tbl_ads.id = '$searchData'";
            } else if ($by == "link") {
                $sql = "SELECT * FROM tbl_ads WHERE tbl_ads.link = '$searchData'";
                $total_sql = "SELECT id FROM tbl_ads WHERE tbl_ads.link = '$searchData'";
            }
        } else if ($table == "user") {
            if ($by == "id") {
                $sql = "SELECT id, username, email, userType, perUser, perMenu, perNews, perAds, isActivated FROM tbl_user WHERE tbl_user.id = '$searchData'";
                $total_sql = "SELECT id FROM tbl_user WHERE tbl_user.id = '$searchData'";
            } else if ($by == "username") {
                $sql = "SELECT id, username, email, userType, perUser, perMenu, perNews, perAds, isActivated FROM tbl_user WHERE tbl_user.username LIKE '%$searchData%' LIMIT $offset, $count";
                $total_sql = "SELECT id FROM tbl_user WHERE tbl_user.username LIKE '%$searchData%'";
            }
        } else die;

        $data = array();
        $total = 0;

        $rs1 = $cn->query($sql);
        if ($rs1->num_rows) {
            while ($row = $rs1->fetch_assoc()) {
                $data[] = $row;
            }
        }

        //count record of data
        $rs2 = $cn->query($total_sql);
        if ($rs2->num_rows) {
            $total = ($rs2->fetch_array())[0];
        }

        echo json_encode([$data, $total]);
        // } else {
        //     echo json_encode(["SearchResult" => "No data to match."]);
        // }
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
