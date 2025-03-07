<?php

require 'config.php';

$ID = $_GET['ID'];
$sql = "DELETE FROM Animals WHERE ID = $ID";
$stmt = sqlsrv_query($conn, $sql);

if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "DELETE FROM Descriptions WHERE ID = $ID";
$stmt = sqlsrv_query($conn, $sql);

if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message"=> "Animal deleted succesfully!"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>