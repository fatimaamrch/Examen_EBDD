# Gestion de Stock - API

**Description :**

Cette application est une API REST permettant de gérer un stock de produits, les commandes des clients et la gestion des utilisateurs. Elle est construite avec **Node.js, Express, et MySQL.**

**Prérequis :**
  - Node.js installé
  - MySQL installé
  - Un fichier .env contenant les variables de connexion à la base de données

**Installation :**

1 - Cloner le dépôt :

  `git clone <url-du-repo>`

  `cd Examen_EBDD`

2 - Installer les dépendances :

  `npm install`

3 - Créer un fichier .env et renseigner les informations de connexion MySQL :

  `DB_HOST=localhost`

  `DB_USER=root`

  `DB_PASSWORD=yourpassword`

  `PORT=3307`

**Routes de l'API :**

**Gestion des catégories**
  - GET /categories : Récupérer toutes les catégories.

**Gestion des clients**
  - GET /clients : Récupérer tous les clients.
  - GET /clients/:id/commandes : Récupérer les commandes d'un client spécifique.

**Gestion des produits**
  - GET /produits : Récupérer tous les produits.
  - GET /produits/:id/commandes : Lister les commandes contenant un produit précis.
  - GET /produits/stock-faible?seuil=<nombre> : Récupérer les produits ayant un stock faible.

**Gestion des commandes**
  - GET /commandes/:clientId : Récupérer les commandes d’un client spécifique.
  - GET /commandes?start=<YYYY-MM-DD>&end=<YYYY-MM-DD> : Lister les commandes dans une période donnée.
  - GET /recherche-commandes?clientId=<id>&startDate=<YYYY-MM-DD>&endDate=<YYYY-MM-DD>&statut=<statut>&produitId=<id> : Recherche avancée des commandes.
  - POST /gestion-stock : Gérer le stock après une commande.

**Statistiques des ventes**
  - GET /statistiques-ventes?startDate=<YYYY-MM-DD>&endDate=<YYYY-MM-DD> : Obtenir des statistiques de vente.

**Authentification et autorisation**
  - POST /register : Inscription d’un nouvel utilisateur.
  - POST /login : Connexion d’un utilisateur.
  - GET /admin/dashboard : Accès au tableau de bord admin (protégé).

**Lancement du serveur**

Démarrer le serveur avec :
`node maquette_avion.js`

Le serveur démarre sur `http://localhost:3000.`


# Technologies utilisées :
  - **Node.js**
  - **Express**
  - **MySQL**
  - **Sequelize**
  - **Bcrypt.js** (pour le hachage des mots de passe)
  - **JSON Web Token (JWT)** (pour l’authentification)