<?php
try {
    require_once("../config/connection.php");

    $data = array();
    $hotNews = array();
    $news = array();
    $rs = $cn->query("SELECT id, title, img, post_date FROM tbl_news WHERE status = 'Active' ORDER BY post_date DESC LIMIT 4");
    if ($rs->num_rows) {
        while ($row = $rs->fetch_assoc()) {
            $hotNews[] = $row;
        }
    }

    $rs1 = $cn->query("SELECT id, title, img FROM tbl_menu WHERE status = 'Active' ORDER BY od DESC");
    if ($rs1->num_rows) {
        while ($row = $rs1->fetch_assoc()) {
            $subData = array();
            $rs2 = $cn->query("SELECT id, title, img, post_date FROM tbl_news WHERE status = 'Active' AND menu_id = {$row['id']} ORDER BY post_date DESC LIMIT 6");
            if ($rs2->num_rows) {
                while ($row2 = $rs2->fetch_assoc())
                    $subData[] = $row2;
                $news[] = [
                    "id" => $row["id"],
                    "title" => $row["title"],
                    "img" => $row["img"],
                    "newsList" => $subData
                ];
            }
        }
    }

    $data = [
        "HotNews" => $hotNews,
        "News" => $news
    ];
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
