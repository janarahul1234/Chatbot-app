<?php

require_once 'config.php';

function send(array $value): void
{
    echo json_encode($value);
}

function receipt(): array
{
    return (array) json_decode(file_get_contents('php://input'), true);
}

function sanitize($conn, string $string): string
{
    return mysqli_real_escape_string($conn, $string);
}

$message = sanitize($conn, receipt()["message"]);

$sql = "SELECT answer FROM chats WHERE question like '%{$message}%'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $answer = mysqli_fetch_assoc($result)["answer"];

    send([
        "type" => "bot",
        "message" => $answer,
    ]);
} else {
    send([
        "type" => "bot",
        "message" => "I do not understand",
    ]);
}
