<?php
require_once("../config/connection.php");

try {
    require_once("../config/connection.php");

    session_unset();
    echo json_encode(["message" => "Success"]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
