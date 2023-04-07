<?php
session_start();
require("./../pages/profil.tpl");

if(!isset($_SESSION['loggedUser'])) {

    header('location: ../php/accueilNC.php');
}

function read_coms_bd()
{
    require("./../php/connectSQL.php");
    //$sql = "SELECT * FROM commentaires WHERE idUtilisateur = :id";
    $sql = "SELECT c.id, c.idUtilisateur, c.idRestaurant, c.commentaire, c.Note, r.Nom, r.Adresse FROM commentaires c, restaurants r WHERE c.idRestaurant = r.id AND c.idUtilisateur = :id";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "id" => $_SESSION['profil']['id'],
        ]);

        if ($bool) {
            $resultat = $data->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    catch (PDOException $e) {
        echo ("Echec de select : " . $e->getMessage() . "\n");
        die(); // On arrête tout.
    }

    return $resultat;
}

?>