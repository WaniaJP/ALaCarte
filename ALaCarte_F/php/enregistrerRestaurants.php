<?php
session_start();

if(!isset($_SESSION['profil'])) {

    header('location: ./../php/accueilNC.php');

} else {

    $nom = $_POST['nom'];
    $adresse = $_POST['adresse'];

    require("./../php/connectSQL.php");
    $sql = "INSERT INTO restaurants (idUtilisateur, Nom, Adresse) VALUES (:idUtilisateur, :Nom, :Adresse)";

    try {
        $data = $pdo->prepare($sql);
        $data->execute([
            "idUtilisateur" => $_SESSION['profil']['id'],
            "Nom" => $nom,
            "Adresse" => $adresse
        ]);
    } catch (PDOException $e) {
        echo ("Echec de select : " . $e->getMessage() . "\n");
        die(); // On arrête tout.
    }
}
?>