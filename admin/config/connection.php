<?php

$cn = new mysqli("localhost", "root", "Rs123451@", "the_angkor_times");
$cn->set_charset("utf8");

// ini_set("session.use_only_cookies", 1);
// ini_set("session.use_strict_mode", 1);

// session_set_cookie_params([
//     "lifetime" => 60,
//     "domain" => 'angkornews',
//     "path" => "/",
//     "secure" => false,
//     "httponly" => true
// ]);

session_start();

// if (!isset($_SESSION["last_regeneration"])) {
//     session_regenerate_id(true);
//     $_SESSION["last_regeneration"] = time();
// } else {
//     $interval = 60 * 30;
//     if (time() - $_SESSION["last_regeneration"] >= $interval) {
//         session_regenerate_id(true);
//         $_SESSION["last_regeneration"] = time();
//     }
// }

$parentFile = basename($_SERVER['SCRIPT_FILENAME']);
if ($parentFile != "checkLogin.php" && $parentFile != "login.php" && $parentFile != "resetPassword.php" && $parentFile != "forgot password.php" && $parentFile != "checkOtp.php" && $parentFile != "checkResetPassword.php") {
    if (isset($_SESSION["email"]) && isset($_SESSION["password"])) {
        $rs = $cn->query("SELECT * FROM tbl_user WHERE email='{$_SESSION["email"]}' AND password='{$_SESSION["password"]}'");
        if ($rs->num_rows == 0) {
            $cn->close();
            throw new Exception('Sorry, you do not have permission to access this file.');
        }
    } else {
        $cn->close();
        throw new Exception('Sorry, you do not have permission to access this file.');
    }
}
