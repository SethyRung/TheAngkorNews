<?php
try {
    require_once("../config/connection.php");

    if (isset($_GET["location"])) {
        $data = array();
        if ($_GET["location"] == "Top of page") {
            $rs = $cn->query("SELECT ads, link FROM tbl_ads WHERE status = 'Active' AND location='Top of page'");
        } else {
            $rs = $cn->query("SELECT ads, link FROM tbl_ads WHERE status = 'Active' AND location='In order' ORDER BY od DESC");
        }
        if ($rs->num_rows) {
            while ($row = $rs->fetch_assoc()) {
                $element = str_replace(array("<p>", "</p>"), '', $row["ads"]);
                if (str_contains($element, '<img src="'))
                    $row["ads"] = str_replace("images/", "admin/images/", $element);
                else $row["ads"] = $element;
                $data[] = $row;
            }
        }
        echo json_encode($data);
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
