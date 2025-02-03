require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');


const app = express();
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    multipleStatements: true
};

const executeSQLFile = async (connection, filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`${filePath} exécuté avec succès`);
};

const initDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connexion à MySQL réussie');

        await executeSQLFile(connection, 'db.sql');

        await connection.changeUser({ database: 'gestion_stock' });

        await executeSQLFile(connection, 'data.sql');

        console.log('Base de données initialisée avec succès');
        return connection;
    } catch (err) {
        console.error('Erreur lors de l\'initialisation de la base de données :', err);
        process.exit(1);
    }
};

initDB().then(connection => {

    // Gestion des produits
    app.post('/produits', async (req, res) => {
        const { nom, description, prix_unitaire, quantite_stock, categorie_id } = req.body;
        const sql = 'INSERT INTO Produits (nom, description, prix_unitaire, quantite_stock, categorie_id) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [nom, description, prix_unitaire, quantite_stock, categorie_id]);
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });

    app.get('/produits', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Produits');
        res.json(result);
    });

    app.get('/produits/injection', async (req, res) => {
        const { nom } = req.query;
        const [result] = await connection.query(`SELECT * FROM Produits WHERE nom='${nom}'`);
        res.json(result);
    });


    app.get('/produits/:id', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Produits WHERE id = ?', [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(result[0]);
    });

    app.put('/produits/:id', async (req, res) => {
        const { nom, description, prix_unitaire, quantite_stock, categorie_id } = req.body;
        const sql = 'UPDATE Produits SET nom = ?, description = ?, prix = ?, stock = ?, categorie_id = ? WHERE id = ?';
        await connection.query(sql, [nom, description, prix_unitaire, quantite_stock, categorie_id, req.params.id]);
        res.json({ message: 'Produit mis à jour avec succès' });
    });

    app.delete('/produits/:id', async (req, res) => {
        await connection.query('DELETE FROM Produits WHERE id = ?', [req.params.id]);
        res.json({ message: 'Produit supprimé avec succès' });
    });

    // Gestion des clients
    app.post('/clients', async (req, res) => {
        const { nom, adresse, telephone } = req.body;
        const sql = 'INSERT INTO Clients (nom, adresse, telephone) VALUES (?, ?, ?)';
        await connection.query(sql, [nom, adresse, telephone]);
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });

    app.get('/clients', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Clients');
        res.json(result);
    });

    // Gestion des commandes
    app.post('/commandes', async (req, res) => {
        const { client_id } = req.body;
        const sql = 'INSERT INTO Commandes (client_id, date_commande) VALUES (?, NOW())';
        await connection.query(sql, [client_id]);
        res.status(201).json({ message: 'Commande créée avec succès' });
    });

    app.get('/commandes', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Commandes');
        res.json(result);
    });

    app.get('/commandes/:id', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Commandes WHERE id = ?', [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.json(result[0]);
    });

    // Gestion des lignes de commande
    app.post('/lignes_commande', async (req, res) => {
        const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
        const sql = 'INSERT INTO Lignes_Commande (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)';
        await connection.query(sql, [commande_id, produit_id, quantite, prix_unitaire]);
        res.status(201).json({ message: 'Ligne de commande ajoutée avec succès' });
    });

    app.get('/lignes_commande', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Lignes_Commande');
        res.json(result);
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
});