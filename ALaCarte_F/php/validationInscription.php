<?php
session_start();

$pseudo = $_POST['pseudo'];
$email = $_POST['email'];
$password = $_POST['password'];
$password2 = $_POST['password2'];

try{
    require('connectSQL.php');
    if(isset($_POST["envoyer"])){
        if(pseudoValide($pseudo) && emailValide($email) && passwordValide($password) && passwordValide2($password, $password2)){
            $sql = "INSERT INTO utilisateurs (`Pseudo`, `Mail`, `MotDePasse`) VALUES ('$pseudo','$email', '$password')";
            $connexion = $pdo->prepare($sql);
            $connexion->execute();
            header('Location:../pages/InscriptionReussie.html');
        }
        else{
            header('Location:../pages/inscriptionRaté.html');
        }
    }
    else{
        header('Location:../pages/inscriptionRaté.html');
    }
}

catch(PDOException $e){
    echo 'Echec : ' .$e->getMessage();
}

function pseudoValide($pseudo){
    if(strlen($pseudo) > 6){
        return true;
    }
    return false;
}

function emailValide($email){
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
        return true;
    }
    return false;
}

function passwordValide($password){
    if(strlen($password) > 6){
        return true;
    }
    return false;
}

function passwordValide2($password, $password2){
    if($password == $password2){
        return true;
    }
    return false;
}

?>