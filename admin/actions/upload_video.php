<?php
try {
    $target_path = "../videos/";

    $tmp_name = $_FILES['upload']['tmp_name'];
    $filename = $_FILES['upload']['name'];
    $target_file = $target_path . $filename;
    $num = $_POST['num'];
    $num_chunks = $_POST['num_chunks'];

    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $newName = time() . mt_rand(100000, 999999) . "." . $ext;

    move_uploaded_file($tmp_name, $target_file . $num);

    if ($num === $num_chunks) {
        for ($i = 1; $i <= $num_chunks; $i++) {

            $file = fopen($target_file . $i, 'rb');
            $buff = fread($file, 1024 * 1024 * 0.5);
            fclose($file);

            $final = fopen($target_path . $newName, 'ab');
            $write = fwrite($final, $buff);
            fclose($final);

            unlink($target_file . $i);
        }

        echo json_encode(["Path" => "videos/$newName"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
