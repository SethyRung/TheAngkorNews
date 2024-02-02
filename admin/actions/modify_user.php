<?php
try {
    require_once("../config/connection.php");

    //handle post requests from clients
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents("php://input");
        $data = json_decode($jsonData, true);
        $id = $data["id"];
        $userName = $data["username"];
        $email = $data["email"];
        $password = md5(md5($email) . $data["password"]);
        $userType = $data["userType"];
        $perUser = $data["perUser"];
        $perMenu = $data["perMenu"];
        $perNews = $data["perNews"];
        $perAds = $data["perAds"];

        $action = $data["action"];

        if ($action == "insert") {
            $sql = "INSERT INTO tbl_user VALUES(null, '$userName', '$email', '$password', '$userType', '$perUser', '$perMenu', '$perNews', '$perAds', null, null,'false')";
            $rs = $cn->query($sql);
            if ($rs == 1) {
                echo json_encode(["Successful" => "Data entry to table successful"]);
            } else {
                echo json_encode(["Unsuccessful" => "Data entry to table failed"]);
            }
        } else if ($action == "update") {
            if ($id != $_SESSION["id"]) {
                $sql = "UPDATE tbl_user SET username='$userName', email='$email', userType='$userType', perUser='$perUser', perMenu='$perMenu', perNews='$perNews', perAds='$perAds' WHERE id=$id";
                $rs = $cn->query($sql);
                if ($rs == 1) {
                    echo json_encode(["Successful" => "Update to table data successfully"]);
                } else {
                    echo json_encode(["Unsuccessful" => "Update to table data failed"]);
                }
            } else {
                echo json_encode(["Unsuccessful" => "Unable to edit your own account"]);
            }
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
