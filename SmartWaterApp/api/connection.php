<?php

class Connection{

  private static $host = "localhost";
  private static $db_name = "smartWater";
  private static $user = "postgres";
  private static $password = "database";


  public function getConnection()
  {
    try {
       $conn = new PDO("pgsql:host=".self::$host." dbname=".self::$db_name." user=".self::$user." password=".self::$password);
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       return $conn;
    } catch (PDOException  $e) {
      // Show error message
      print "Erro: " . $e->getMessage();
 	    // kill connection
      die();
    }
  }

}
?>
