<?php

require 'config.php';

$ID = $_GET['ID'];
$sql = "DELETE FROM Pins WHERE ID = $ID";
$stmt = sqlsrv_query($conn, $sql);

if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "DELETE FROM PinsInfo WHERE ID = $ID";
$stmt = sqlsrv_query($conn, $sql);

if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message"=> "Pin deleted succesfully!"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>