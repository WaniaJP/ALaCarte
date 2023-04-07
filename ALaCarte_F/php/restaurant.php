<?php
session_start();

require("./../pages/restaurant.tpl");


function getNbCommentaires_bd()
{
    require("./../php/connectSQL.php");
    $sql = "SELECT Count(Commentaire) FROM Commentaires WHERE Nom = :Nom";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "Nom" => $_GET['nom'],
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

function getAvgNote() {

    require("./../php/connectSQL.php");
    $sql = "SELECT AVG(NOTE) FROM COMMENTAIRES WHERE NOM = :Nom";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "Nom" => $_GET['nom'],
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

function getComs() {

    require("./../php/connectSQL.php");
    $sql = "SELECT idUtilisateur, commentaire FROM COMMENTAIRES WHERE NOM = :Nom";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "Nom" => $_GET['nom'],
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

function getPseudo($i) {

    require("./../php/connectSQL.php");
    $sql = "SELECT id, Pseudo FROM utilisateurs WHERE id = :id";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "id" => $i,
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

function getNoteByuser($i, $resto) {


    require("./../php/connectSQL.php");
    $sql = "SELECT Note, Nom FROM Commentaires WHERE idUtilisateur = :id AND Nom = :Nom";

    try {
        $data = $pdo->prepare($sql);
        $bool = $data->execute([
            "id" => $i,
            "Nom" => $resto,
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