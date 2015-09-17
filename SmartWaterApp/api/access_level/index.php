<?php
require '../vendor/autoload.php';
require_once '../connection.php';

$app = new \Slim\Slim();

$app->get('/', function ()  {
  $sql = "SELECT * FROM access_level";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->query($sql);
    $access_levels = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($access_levels);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->get('/:id', function ($id)  {
  $sql = "SELECT * FROM access_level WHERE id=:id";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $access_level = $stmt->fetchObject();
    $db = null;
    echo json_encode($access_level);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->post('/', function () {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $access_level = json_decode($body);

  $sql = "INSERT INTO access_level(description) VALUES (:description)";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("description", $access_level->description);
    $stmt->execute();
    $access_level->id = $db->lastInsertId("access_level_id_seq");
    $db = null;
    echo json_encode($access_level);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->put('/:id', function ($id) {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $access_level = json_decode($body);
  $access_level->id = $id;

  $sql = "UPDATE access_level SET description=:description WHERE id=:id";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $access_level->id);
    $stmt->bindParam("description", $access_level->description);
    $stmt->execute();
    $db = null;
    echo json_encode($access_level);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->delete('/:id', function($id) {
  $sql = "DELETE FROM access_level WHERE id=:id";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->run();
