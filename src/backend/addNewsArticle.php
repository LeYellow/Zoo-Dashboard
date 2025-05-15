<?php

require 'config.php';

$input = file_get_contents("php://input");
$artData = json_decode($input, true);

if ((!isset($artData['Title']) || trim($artData['Title']) === '')) {
    die(json_encode(array("message" => "Cannot add article with no title")));
}

$Title=$artData['Title'];
$SubTitle=$artData['SubTitle'];
$Img=$artData['Img'];
$Txt=$artData['Txt'];

$sql = "INSERT INTO NewsArticles (Title, SubTitle, Img, Txt)  VALUES (?, ?, ?, ?)";
$params = array($Title, $SubTitle, $Img, $Txt); 
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Article added successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>