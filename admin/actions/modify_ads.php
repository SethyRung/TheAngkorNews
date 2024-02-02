<?php
try {
    require_once("../config/connection.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $id = $data["txtID"];
        $ads = $data["txtAds"];
        $link = $data["txtLink"];
        $location = $data["sltLocation"];
        $od = $data["txtOD"];
        $status = $data["sltStatus"];
        $action = $data["action"];

        if ($action == "insert") {
            $sql = "INSERT INTO tbl_ads(ads, link, location, od,status) VALUES('$ads','$link','$location',$od,'$status')";
            $rs = $cn->query($sql);
            if ($rs == 1) {
                echo json_encode(["Successful" => "Data entry to table successful"]);
            } else {
                echo json_encode(["Unsuccessful" => "Data entry to table failed"]);
            }
        } else if ($action == "update") {
            $sql = "UPDATE tbl_ads SET ads='$ads', link='$link', location='$location', od=$od, status='$status' WHERE id=$id";
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
