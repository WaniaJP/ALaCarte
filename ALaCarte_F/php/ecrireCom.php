<?php
require("../php/accueil.php");

$com = $_POST['commentaire'];
$note = $_POST['note'];
$nom = $_GET['nom'];
$idResto = $_GET['id'];
$adresse = $_GET['adresse'];


require("./../php/connectSQL.php");

$sql = "INSERT INTO commentaires( idUtilisateur, idRestaurant, Nom, Commentaire, Note, `Date`) VALUES (:id, :idRestaurant, :nom, :commentaire, :note, CURRENT_TIMESTAMP)";
try {
    $data = $pdo->prepare($sql);
    $bool = $data->execute([
        "id" => $_SESSION['profil']['id'],
        "idRestaurant" => $idResto,
        "nom" => $nom,
        "commentaire" => $com,
        "note" => $note,
    ]);
    @header("Location: ../pages/carte.html");
} catch (PDOException $e) {
    echo ("Echec de select : " . $e->getMessage() . "\n");
    die(); // On arrête tout.
}

?>