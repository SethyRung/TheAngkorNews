<?php
try {
    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $id = $data["txtID"];
        $menu_id = $data["sltMenu"];
        $title = $data["txtTitle"];
        $od = $data["txtOD"];
        $status = $data["sltStatus"];
        $description = str_replace('<img src="images/', '<img src="/aktimes/admin/images/', $data["txtDescription"]); //The reason for replacing it is to make the image viewable everywhere.
        $img = $data["image"];
        $name_link = "1";
        $action = $data["action"];

        if ($action == "insert") {
            $click = 0;
            $uid = 0;
            date_default_timezone_set('Asia/Phnom_Penh');
            $post_date = date("Y-m-d H:i:s");

            $sql = "INSERT INTO tbl_news(menu_id, title, img, des, od, click, uid, post_date, status, name_link) VALUES('$menu_id','$title','$img', '$description',$od, $click, $uid, '$post_date','$status','$name_link')";
            $rs = $cn->query($sql);
            if ($rs == 1) {
                echo json_encode(["Successful" => "Data entry to table successful"]);
            } else {
                echo json_encode(["Unsuccessful" => "Data entry to table failed"]);
            }
        } else if ($action == "update") {
            $sql = "UPDATE tbl_news SET menu_id=$menu_id,title='$title', img='$img', des='$description', od=$od, status='$status', name_link='$name_link' WHERE id=$id";
            $rs = $cn->query($sql);
            if ($rs == 1) {
                echo json_encode(["Successful" => "Update to table data successfully"]);
            } else {
                echo json_encode(["Unsuccessful" => "Update to table data failed"]);
            }
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
