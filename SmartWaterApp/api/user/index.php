<?php
require '../vendor/autoload.php';
require_once '../connection.php';

session_start();

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

$app->get('/users/', function ()  {
  $sql = "SELECT * FROM users where access_level = 2";
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
  $sql = "SELECT * FROM users where cpf=:cpf";
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

$app->get('/:cpf/:password', function ($cpf,$password)  {
  $sql = "SELECT * FROM users where cpf=:cpf and password=:password";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $cpf);
    $stmt->bindParam("password", $password);
    $stmt->execute();
    $user = $stmt->fetchObject();
    $db = null;
    if($user != null) {
      $_SESSION['cpf_session'] = $cpf;
      $_SESSION['password_session'] = $password;
      $_SESSION['access_level_session'] = $user->access_level;
    } else {
      unset($_SESSION['cpf_session']);
      unset($_SESSION['password_session']);
      unset($_SESSION['access_level_session']);
    }
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->post('/', function () {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $user = json_decode($body);
  $sql = "INSERT INTO users (cpf,name,address,city,state_city,country,zip_code,password,email,number_of_residents,access_level)
          VALUES (:cpf,:name,:address,:city,:state_city,:country,:zip_code,:password,:email,:number_of_residents,:access_level)";
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
    $stmt->bindParam("zip_code", $user->zip_code);
    $stmt->bindParam("password", $user->password);
    $stmt->bindParam("email", $user->email);
    $stmt->bindParam("number_of_residents", $user->number_of_residents);
    $stmt->bindParam("access_level", $user->access_level);
    $stmt->execute();
    $db = null;
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->put('/:cpf', function ($old_cpf) {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $user = json_decode($body);

  $sql = "UPDATE users SET cpf=:cpf,name=:name, address=:address, city=:city, state_city=:state_city,
          country=:country, password=:password, email=:email, number_of_residents=:number_of_residents,
          access_level=:access_level WHERE cpf=:old_cpf";
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
    $stmt->bindParam("number_of_residents", $user->number_of_residents);
    $stmt->bindParam("access_level", $user->access_level);
    $stmt->bindParam("old_cpf", $old_cpf);
    $stmt->execute();
    $db = null;
    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
});

$app->put('/password/', function () {
  $request = \Slim\Slim::getInstance()->request();
  $body = $request->getBody();
  $user = json_decode($body);

  $sql = "UPDATE users SET password=:password WHERE cpf=:cpf";
  try {
    $conn = new Connection();
    $db = $conn->getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("cpf", $user->cpf);
    $stmt->bindParam("password", $user->password);
    $stmt->execute();
    $db = null;
    unset($_SESSION['password_session']);
    $_SESSION['password_session'] = $user->password;
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
