<?php

require 'config.php';

$User='Alex Andrei';
$PlainPass='Alex1997';

$HashedPass = password_hash($PlainPass, PASSWORD_DEFAULT);

$sql = "INSERT INTO Users (Username, Password) VALUES (?,?)";
$params = array($User, $HashedPass);
$stmt = sqlsrv_query($conn, $sql, $params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Registered successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

//trigger with
//http://localhost/ZooDashboard/zoo_dashboard/src/backend/userRegister.php

?>