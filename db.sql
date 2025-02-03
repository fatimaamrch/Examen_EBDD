DROP DATABASE IF EXISTS gestion_stock;
CREATE DATABASE gestion_stock;
USE gestion_stock;

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
