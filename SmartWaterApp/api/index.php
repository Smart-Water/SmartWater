<?php
require 'vendor/autoload.php';

include ("../session/session.php");

$app = new \Slim\Slim();
$app->get('/', function () {
    echo "Welcome to SmartWater API";
});

$app->run();
