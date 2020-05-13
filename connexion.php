<?php

    /**
     * Connexion à une base de données
     */
    define('HOST', 'localhost');
    define('USER', 'root');
    define('PASSWD', '');
    define('DBNAME', '');

    try{
        $db = new PDO("mysql:host=".HOST.";dbname=".DBNAME, USER, PASSWD, [
            // GESTION DES ERREURS PHO/SQL
            PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
            //Gestion du jeu de caractères
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            //Gestion du retours des résultats
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC

        ]);

        // L'utilisateur n'a pas à voir ce message
        // echo '<p>Base de données connectée</p>';


    } catch (Exception $error) {
        // Attrape une exception
        echo 'Erreur lors de la connexion à la base de données !'.$error->getMessage();
    }

    


?>