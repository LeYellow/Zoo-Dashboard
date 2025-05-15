<?php

require 'config.php';

$ID = $_GET['ID'];
$sql = "SELECT Title, SubTitle, convert(varchar, CreatedAt, 103) AS Date, Img, Txt FROM NewsArticles WHERE ID=?";
$params = array($ID);

$stmt=sqlsrv_query($conn, $sql, $params);
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