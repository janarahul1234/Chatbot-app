<?php

$database_host = 'localhost';
$database_name = 'chatbot';
$database_user = 'root';
$database_password = '';

$conn = mysqli_connect($database_host, $database_user, $database_password, $database_name);

if ( ! $conn) {
    die("Connection failed: ". mysqli_connect_error());
}