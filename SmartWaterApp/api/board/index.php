<?php
require '../vendor/autoload.php';
require_once '../connection.php';

include ("../../session/session.php");

$app = new \Slim\Slim();

$corsOptions = array(
    "origin" => "*",
    "exposeHeaders" => array("Content-Type", "X-Requested-With", "X-authentication", "X-client"),
    "allowMethods" => array('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
);
$cors = new \CorsSlim\CorsSlim($corsOptions);

$app->add($cors);

$app->get('/', function ()  {
  $sql = "SELECT * FROM boards";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->query($sql);
    $boards = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($boards);
  } catch(PDOException $e) {
  echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->get('/:mac_address', function ($mac_address)  {
  $sql = "SELECT * FROM boards WHERE mac_address=:mac_address";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("mac_address", $mac_address);
    $stmt->execute();
    $board = $stmt->fetchObject();
    $db = null;
    echo json_encode($board);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->get('/user/:cpf', function ($cpf)  {
  $sql = "SELECT * FROM boards WHERE cpf_user=:cpf";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $cpf);
    $stmt->execute();
    $board = $stmt->fetchObject();
    $db = null;
    echo json_encode($board);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->post('/', function () {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $board = json_decode($body);
  $sql = "INSERT INTO boards (mac_address,cpf_user) VALUES (:mac_address,:cpf_user)";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $boardLowerCase = strtolower($board->mac_address);
    $board->mac_address = $boardLowerCase;
    $stmt->bindParam("mac_address", $board->mac_address);
    $stmt->bindParam("cpf_user", $board->cpf_user);
    $stmt->execute();
    $db = null;
    echo json_encode($board);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->put('/:mac_address', function ($old_mac_address) {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $board = json_decode($body);
  //$board->mac_address = $old_mac_address;

  $sql = "UPDATE boards SET mac_address=:mac_address,cpf_user=:cpf_user WHERE mac_address=:old_mac_address";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("mac_address", $board->mac_address);
    $stmt->bindParam("cpf_user", $board->cpf_user);
    $stmt->bindParam("old_mac_address", $old_mac_address);
    $stmt->execute();
    $db = null;
    echo json_encode($board);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->delete('/:mac_address', function($mac_address) {
  $sql = "DELETE FROM boards WHERE mac_address=:mac_address";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("mac_address", $mac_address);
    $stmt->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->run();
