<?php
class AccesBd
{
    private $pdo = null;    // Objet de Connexion (PDO)
    private $requetePdo = null; // Objet de requête paramétrée PDO (PDOStatement)

    function __construct()
    {
        try {
            $options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
            // Connection au serveur de développement (Ne pas effacer)

            // $this->pdo = new PDO(
            //     "mysql:host=monvino.c2i48shq0eku.us-east-1.rds.amazonaws.com; port=3306; dbname=monvino; charset=utf8",
            //     'e2195277',
            //     '3fRPgQeQgFf2w5jC3Bcg',
            //     $options
            // );

            // Connection en localhost

            $this->pdo = new PDO(
                "mysql:host=localhost; dbname=pw2; charset=utf8",
                'root',
                '',
                $options
            );
        } catch (Exception $e) {
            echo 'Unable to connect to the database';
            echo $e->getMessage();
            exit;
        }
    }

    /**
     * Soumet une requête paramétrée PDO
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return void
     */
    private function soumettre($sql, $params = [])
    {
        $this->requetePdo = $this->pdo->prepare($sql);
        // var_dump($params);
        $this->requetePdo->execute($params);
    }


    /**
     * Obtient un jeu d'enregistrement groupé (par première colonne sélectionnée)
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return array Tableau associatif (colonne de groupage) contenant des tableaux
     *                  des données groupées
     */
    protected function lire($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        // if ($groupe !== PDO::FETCH_GROUP) {
        //     return $this->requetePdo->fetchAll($params);
        // }
        return $this->requetePdo->fetchAll();
    }

    protected function lireUn($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->fetch();
    }

    /**
     * Insère un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Identifiant (auto increment) du dernier enregistrement inséré
     */
    protected function creer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->pdo->lastInsertId();
    }

    /**
     * Modifie un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrements affectés
     */
    protected function modifier($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }

    /**
     * Modifie un enregistrement
     *
     * @param  string $sql Chaîne contenant une requête SQL paramétrée
     * @param  array $params Tableau associatif des paramètres de la requête
     * @return int Nombre d'enregistrements affectés
     */
    protected function supprimer($sql, $params = [])
    {
        $this->soumettre($sql, $params);
        return $this->requetePdo->rowCount();
    }
}