<?php
session_start();

if((!isset ($_SESSION['cpf_session']) == true) and (!isset ($_SESSION['password_session']) == true)) {

	header ("Location: ../index.php");

	exit;
} else {
		$uri = $_SERVER['REQUEST_URI'];

		if($_SESSION['access_level_session'] == 1) {
			$uriAdmin = stripos($uri, '/admin');
			if ($uriAdmin === false) {
    			header ("Location: ../index.php");
			}
		} else {
				$uriUser = stripos($uri, '/user');
				if ($uriUser === false) {
						header ("Location: ../index.php");
				}
		}
}
?>
