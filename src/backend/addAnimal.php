<?php

require 'config.php';

$input = file_get_contents("php://input");
$animalData = json_decode($input, true);

if (!isset($animalData['Name']) || trim($animalData['Name']) === '') {
    die(json_encode(array("message" => "Cannot add nameless animal!")));
}

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

$sql = "INSERT INTO Animals (Name, Species, Breed, Enclosure, WasFeed, Responsible) VALUES (?, ?, ?, ?, ?, ?)";
$params = array($Name, $Species, $Breed, $Enclosure, $WasFeed, $Responsible); 
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "INSERT INTO Descriptions (Name, Characteristics, Food, Status, About, Age, Img) VALUES (?, ?, ?, ?, ?, ?, ?)";
$params = array($Name, $Characteristics, $Food, $Status, $About, $Age, $Img);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Animal added successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>