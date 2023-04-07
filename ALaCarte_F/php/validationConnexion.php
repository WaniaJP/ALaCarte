<?php
session_start();
$email = $_POST['email'];
$password = $_POST['password'];

if(isset($_POST['envoyer'])) {

    require("connectSQL.php");
    
    $query = "SELECT id, Pseudo, Mail, MotDePasse FROM utilisateurs WHERE Mail='$email' AND MotDePasse='$password'";
    $connexion = $pdo->prepare($query);
    $connexion->execute();
    
    $resultat = $connexion->fetchAll(PDO::FETCH_ASSOC);

    if (count($resultat) == 0) {


        // Échec de la connexion
        header('location: ./../pages/connexionRaté.html'); 
    }
    else {
        // Connexion réussie : enregistrement de l'utilisateur en session et redirection vers la page d'accueil
        global $profil;
        $profil = array();
        $profil = $resultat[0];

        $_SESSION['profil'] = $profil;
        $_SESSION['loggedUser'] = true;
        header('location: ./../pages/carte.html');
    }
}

?>