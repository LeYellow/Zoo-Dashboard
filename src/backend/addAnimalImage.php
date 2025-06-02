<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");

$target_dir = "../../../extResources/Animals/";

if(isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    if(move_uploaded_file($_FILES["image"]["tmp_name"],$target_file)) {
        echo "Image uploaded succesfully!";
    } else {
        http_response_code(500);
        echo "Couldn't upload Pin image";
    }
} else {
    echo "No image uploaded";
}
?>