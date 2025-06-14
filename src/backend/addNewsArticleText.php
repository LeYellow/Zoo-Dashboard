<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");

$target_dir = "../../../extResources/NewsText/";

if(isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    if(move_uploaded_file($_FILES["file"]["tmp_name"],$target_file)) {
        echo "Text uploaded succesfully!";
    } else {
        http_response_code(500);
        echo "Couldn't upload Article text";
    }
} else {
    echo "No text uploaded";
}
?>