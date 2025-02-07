DROP DATABASE IF EXISTS gestion_stock;
CREATE DATABASE gestion_stock;
USE gestion_stock;

-- Table utilisateur
CREATE TABLE Utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);


-- Table des catégories de produits
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) UNIQUE NOT NULL
);

-- Table des produits 
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    quantite_stock INT NOT NULL DEFAULT 0,
    categorie_id INT NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table des fournisseurs
CREATE TABLE fournisseurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    adresse TEXT
);

-- Table d’association entre produits et fournisseurs
CREATE TABLE produits_fournisseurs (
    produit_id INT NOT NULL,
    fournisseur_id INT NOT NULL,
    prix_achat DECIMAL(10,2) NOT NULL,
    delai_livraison INT NOT NULL,
    PRIMARY KEY (produit_id, fournisseur_id),
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE,
    FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id) ON DELETE CASCADE
);

-- Table des clients
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT
);

-- Table des commandes
CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en attente', 'validée', 'expédiée', 'annulée') DEFAULT 'en attente',
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Table des lignes de commande 
CREATE TABLE lignes_commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL, 
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);


CREATE PROCEDURE recherche_commandes(
    IN p_client_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_statut VARCHAR(50),
    IN p_produit_id INT
)


BEGIN
    SELECT c.id AS commande_id, c.date_commande, c.statut, cl.nom AS client_nom, p.nom AS produit_nom
    FROM commandes c
    JOIN clients cl ON c.client_id = cl.id
    JOIN ligne_commandes lc ON c.id = lc.commande_id
    JOIN produits p ON lc.produit_id = p.id
    WHERE (p_client_id IS NULL OR c.client_id = p_client_id)
    AND (p_start_date IS NULL OR c.date_commande >= p_start_date)
    AND (p_end_date IS NULL OR c.date_commande <= p_end_date)
    AND (p_statut IS NULL OR c.statut = p_statut)
    AND (p_produit_id IS NULL OR p.id = p_produit_id);
END;



CREATE PROCEDURE statistiques_ventes(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- Total des ventes
    SELECT SUM(c.total) AS total_ventes
    FROM commandes c
    WHERE c.date_commande BETWEEN p_start_date AND p_end_date;

    -- Produits les plus vendus
    SELECT p.nom, COUNT(lc.id) AS total_vendu
    FROM ligne_commandes lc
    JOIN produits p ON lc.produit_id = p.id
    JOIN commandes c ON lc.commande_id = c.id
    WHERE c.date_commande BETWEEN p_start_date AND p_end_date
    GROUP BY p.id
    ORDER BY total_vendu DESC
    LIMIT 10;
END;


CREATE PROCEDURE stock_faible(
    IN p_seuil INT
)
BEGIN
    SELECT p.id, p.nom, p.stock
    FROM produits p
    WHERE p.stock < p_seuil;
END;
