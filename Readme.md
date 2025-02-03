Résumé des tables et leur rôle dans le projet :
 produits → Stocke les infos des maquettes d’avion en papier
 categories → Permet de classer les produits
 fournisseurs → Liste les fournisseurs des maquettes
 produits_fournisseurs → Gère les relations produit-fournisseur
 clients → Stocke les informations des clients
 commandes → Contient les commandes des clients
 lignes_commande → Détaille les produits inclus dans chaque commande

Connexion à la base de données :

Le fichier .env contient les informations de connexion (DB_HOST, DB_USER, DB_PASSWORD, PORT).
Les scripts SQL db.sql (structure de la base de données) et data.sql (données initiales) sont exécutés lors de l'initialisation de la base de données.

API pour gérer les produits :

POST /produits : Ajouter un produit.
GET /produits : Récupérer tous les produits.
GET /produits/injection : Recherche d'un produit par son nom (injection de données).
GET /produits/:id : Récupérer un produit spécifique.
PUT /produits/:id : Mettre à jour un produit.
DELETE /produits/:id : Supprimer un produit.

API pour gérer les clients :

POST /clients : Ajouter un client.
GET /clients : Récupérer tous les clients.

API pour gérer les commandes :

POST /commandes : Créer une commande pour un client.
GET /commandes : Récupérer toutes les commandes.
GET /commandes/:id : Récupérer une commande spécifique.

API pour gérer les lignes de commande :

POST /lignes_commande : Ajouter une ligne de commande.
GET /lignes_commande : Récupérer toutes les lignes de commande.

