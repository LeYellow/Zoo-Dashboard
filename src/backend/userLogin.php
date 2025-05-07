<?php

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents("php://input");
$loginData = json_decode($input, true);

$User=$loginData['Username'];
$Pass=$loginData['Password'];
//$User='Subin Tudor';
//$Pass='';

if (empty($User) || empty($Pass)) {
    http_response_code(400);
    die(json_encode(["error" => "Cannot login without credentials!"]));
    exit();
}

$sql = "SELECT Password FROM Users WHERE Username=?";
$params = array($User); 
$stmt = sqlsrv_query($conn, $sql, $params);

if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}

$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if(!$result || !password_verify($Pass, $result['Password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Incorrect username or password"]);
    exit();
}

echo json_encode(array("succes" => "Logged in successfully"));
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>