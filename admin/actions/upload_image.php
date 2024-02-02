<?php
if (isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $tmp = $file['tmp_name'];
    $img_name = $file['name'];
    $ext = pathinfo($img_name, PATHINFO_EXTENSION);
    $newName = time() . mt_rand(100000, 999999);
    move_uploaded_file($tmp, "../images/" . $newName . "." . $ext);
    // $msg['Name'] = $newName . '.' . $ext;
    $msg['Path'] = "images/" . $newName . "." . $ext;

    echo json_encode($msg);
}
