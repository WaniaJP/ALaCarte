<?php
	$hostname = "localhost";	
	$base = "bd_leaflet";
	$loginBD= "root";	
	$passBD="root";

	try {

		// Connexion à MySQL
		$dsn = "mysql:server=$hostname; dbname=$base";
		
		$pdo = new PDO ($dsn, $loginBD, $passBD,
		array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		// Le dernier argument sert à ce que toutes les chaines de caractères 
		// en entrée et sortie de MySql soit dans le codage UTF-8
		

		// On active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
   }
?>	