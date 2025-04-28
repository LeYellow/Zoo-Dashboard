<?php

require 'config.php';

$input = file_get_contents("php://input");
$pinData = json_decode($input, true);

if ((!isset($pinData['X']) || trim($pinData['X']) === '') && (!isset($pinData['Y']) || trim($pinData['Y']) === '')) {
    die(json_encode(array("message" => "Cannot add pin with no coords!")));
}

$X=$pinData['X'];
$Y=$pinData['Y'];

$Title=$pinData['Title'];
$Descr=$pinData['Descr'];

$sql = "INSERT INTO Pins (X, Y) VALUES (?, ?)";
$params = array($X, $Y); 
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "INSERT INTO PinsInfo (Title, Descr) VALUES (?, ?)";
$params = array($Title, $Descr);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Pin added successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>