<?php
session_start();
require("./../pages/restaurants_enregistres.tpl");

function read_restos_bd()
{
    require("./../php/connectSQL.php");
    $sql = "SELECT id, Nom, Adresse FROM restaurants WHERE idUtilisateur = :id";

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

