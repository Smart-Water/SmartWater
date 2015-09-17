<?php
require '../vendor/autoload.php';
require_once '../connection.php';

$app = new \Slim\Slim();

$app->get('/', function ()  {
  $sql = "SELECT * FROM users";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($users);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->get('/:cpf', function ($cpf)  {
  $sql = "SELECT * FROM users WHERE cpf=:cpf";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $cpf);
    $stmt->execute();
    $user = $stmt->fetchObject();
    $db = null;
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->post('/', function () {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $user = json_decode($body);
  $sql = "INSERT INTO users (cpf,name,address,city,state_city,country,password,email,residente_numbers,access_level)
          VALUES (:cpf,:name,:address,:city,:state_city,:country,:password,:email,:residente_numbers,:access_level)";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $user->cpf);
    $stmt->bindParam("name", $user->name);
    $stmt->bindParam("address", $user->address);
    $stmt->bindParam("city", $user->city);
    $stmt->bindParam("state_city", $user->state_city);
    $stmt->bindParam("country", $user->country);
    $stmt->bindParam("password", $user->password);
    $stmt->bindParam("email", $user->email);
    $stmt->bindParam("residente_numbers", $user->residente_numbers);
    $stmt->bindParam("access_level", $user->access_level);
    $stmt->execute();
    $db = null;
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->put('/:cpf', function ($cpf) {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $user = json_decode($body);
  $user->cpf = $cpf;

  $sql = "UPDATE users SET name=:name, address=:address, city=:city, state_city=:state_city,
          country=:country, password=:password, email=:email, residente_numbers=:residente_numbers,
          access_level=:access_level WHERE cpf=:cpf";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $user->cpf);
    $stmt->bindParam("name", $user->name);
    $stmt->bindParam("address", $user->address);
    $stmt->bindParam("city", $user->city);
    $stmt->bindParam("state_city", $user->state_city);
    $stmt->bindParam("country", $user->country);
    $stmt->bindParam("password", $user->password);
    $stmt->bindParam("email", $user->email);
    $stmt->bindParam("residente_numbers", $user->residente_numbers);
    $stmt->bindParam("access_level", $user->access_level);
    $stmt->execute();
    $db = null;
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->delete('/:cpf', function($cpf) {
  $sql = "DELETE FROM users WHERE cpf=:cpf";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();

    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $cpf);
    $stmt->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->run();
