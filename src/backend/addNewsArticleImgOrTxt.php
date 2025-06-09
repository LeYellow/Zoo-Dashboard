<?php

require 'config.php';

$input = file_get_contents("php://input");
$artData = json_decode($input, true);


$ID = $_GET['ID'];
$Img=$artData['Img'];
$Txt=$artData['Txt'];


if (!empty($Img) && empty($Txt)) {
    $sql = "UPDATE NewsArticles SET Img = ? WHERE ID=?";
    $params = array($Img, $ID); 
    $stmt = sqlsrv_query($conn, $sql, $params);
    if (!$stmt) {
        die(print_r(sqlsrv_errors(), true));
    }

    echo json_encode(array("message" => "Article details added successfully"));
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
}

if (empty($Img) && !empty($Txt)) {
    $sql = "UPDATE NewsArticles SET Txt = ? WHERE ID=?";
    $params = array($Txt, $ID); 
    $stmt = sqlsrv_query($conn, $sql, $params);
    if (!$stmt) {
        die(print_r(sqlsrv_errors(), true));
    }

    echo json_encode(array("message" => "Article details added successfully"));
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
}

?>