<?php

require 'config.php';

$input = file_get_contents("php://input");
$animalData = json_decode($input, true);

$ID=$animalData['ID'];

$sql = "UPDATE Animals SET WasFeed = 1 WHERE ID = ?";
$params = array($ID);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Animal fed successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>