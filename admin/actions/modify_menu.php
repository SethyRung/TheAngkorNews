<?php
try {
    require_once("../config/connection.php");

    //handle post requests from clients
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $id = $data["txtID"];
        $title = $data["txtTitle"];
        $od = $data["txtOD"];
        $status = $data["sltStatus"];
        $img = $data["image"];
        $action = $data["action"];

        //inset menu's data to database
        if ($action == "insert") {
            $sql = "INSERT INTO tbl_menu(title, img, od, status) VALUES('$title','$img',$od,'$status')"; //ខ្វះ name_link
            $rs = $cn->query($sql);
            if ($rs == 1) {
                echo json_encode(["Successful" => "Data entry to table successful"]);
            } else {
                echo json_encode(["Unsuccessful" => "Data entry to table failed"]);
            }
        } else if ($action == "update") {
            $sql = "UPDATE tbl_menu SET title='$title', img='$img', od=$od, status='$status' WHERE id=$id"; //ខ្វះ name_link
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
