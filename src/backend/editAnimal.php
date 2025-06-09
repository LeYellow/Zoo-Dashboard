<?php

require 'config.php';

$input = file_get_contents("php://input");
$animalData = json_decode($input, true);

$ID=$animalData['ID'];
$Name=$animalData['Name'];
$Species=$animalData['Species'];
$Breed=$animalData['Breed'];
$Enclosure=$animalData['Enclosure'];
$WasFeed=$animalData['WasFeed'];
$Responsible=$animalData['Responsible'];

$Characteristics=$animalData['Characteristics'];
$Food=$animalData['Food'];
$Status=$animalData['Status'];
$About=$animalData['About'];
$Age=$animalData['Age'];
$Img=$animalData['Img'];

$sql = "UPDATE Animals SET Name = ?, Species = ?, Breed = ?, Enclosure = ?, WasFeed = ?, Responsible = ? WHERE ID = ?";
$params = array($Name, $Species, $Breed, $Enclosure, $WasFeed, $Responsible, $ID);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "UPDATE Descriptions SET Characteristics = ?, Food = ?, Status = ?, About = ?, Age = ?, Img = ? WHERE ID = ?";
$params = array($Characteristics, $Food, $Status, $About, $Age, $Img, $ID);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Animal edited successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>