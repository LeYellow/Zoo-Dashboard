<?php

require 'config.php';

$sql = "SELECT ID, Name, Species, Breed, Enclosure, case
      WHEN WasFeed=1 then 'Yes'
      WHEN WasFeed=0 then 'No'
      ELSE NULL
    end as WasFeed, Responsible From Animals";
    
$stmt=sqlsrv_query($conn, $sql);
if (!$stmt) {
    die(print_r(sqlsrv_errors(),true));
}

$data = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $data[] = $row;
}

sqlsrv_free_stmt($stmt);
echo json_encode($data, JSON_PRETTY_PRINT);
sqlsrv_close($conn);

?>