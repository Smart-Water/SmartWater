<?php
session_start();
unset($_SESSION['login_session']);
unset($_SESSION['password_session']);
unset($_SESSION['access_level_session']);
header ("Location: ../index.php");
?>
