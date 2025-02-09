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