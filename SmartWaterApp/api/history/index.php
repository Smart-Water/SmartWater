<?php
require '../vendor/autoload.php';
require_once '../connection.php';

include ("../../session/session.php");

$app = new \Slim\Slim();

$app->get('/', function () {
    echo "Welcome to SmartWater API";
});

$app->run();
