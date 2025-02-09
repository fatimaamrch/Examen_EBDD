# Gestion de Stock - API 

**Description :**

Cette application est une API REST permettant de gérer un stock de produits, les commandes des clients et la gestion des utilisateurs. Elle est construite avec   **Node.js**, **Express** et **MySQL**.

**Fonctionnalités :**

- **Gestion des produits**
  - Ajouter un produit
  - Obtenir tous les produits
  - Rechercher un produit par nom
  - Obtenir un produit par ID
  - Mettre à jour un produit
  - Supprimer un produit
  
- **Gestion des clients**
  - Ajouter un client
  - Obtenir tous les clients
  
- **Gestion des commandes**
  - Créer une commande
  - Obtenir toutes les commandes
  - Obtenir une commande par ID
  
- **Gestion des lignes de commande**
  - Ajouter une ligne de commande
  - Obtenir toutes les lignes de commande

## Prérequis

- Node.js
- MySQL
- dotenv (pour la gestion des variables d'environnement)

## Installation

1 -  Clonez le repository :

   `git clone https://github.com/fatimaamrch/Examen_EBDD.git`

2 - Allez dans le répertoire du projet :

  `cd Examen_EBDD`

3 - Installez les dépendances : 

  `npm install`

4 - Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

  `DB_HOST=localhost`

  `DB_USER=root`

  `DB_PASSWORD=yourpassword`

  `DB_PORT=3307`

**Lancer l'application :**

Pour démarrer le serveur, exécutez la commande suivante :

  `node maquette_avion.js`


