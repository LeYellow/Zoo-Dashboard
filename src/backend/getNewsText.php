<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET");

$file = $_GET['file'];
$textPath = "D:/Programs/Xampp/htdocs/ZooDashboard/extResources/NewsText/" . $file;

if (file_exists($textPath)) {
    header("Content-Type: text/plain");
    readfile($textPath);
} else {
    http_response_code(404);
    echo "File not found.";
}

?>