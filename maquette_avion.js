require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');
const categories =  require('./categories');
const Client = require('./client'); 
const Produit = require('./produit');
const Commande = require('./commandes');
const Utilisateur = require('./utilisateur'); 
const { verifyToken, isAdmin } = require('./midelware');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Op} = require('sequelize');

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

    app.get('/categories', async (req, res) => {
        const categorie = await categories.findAll();
        res.json(categorie);
    });


    app.get('/clients', async (req, res) => {
        try {
            const clients = await Client.findAll();
            res.json(clients);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
        }
    });

    app.get('/produits', async (req, res) => {
        try {
            const produits = await Produit.findAll();
            res.json(produits);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
        }
    });

    app.get('/commandes/:clientId', async (req, res) => {
        try {
            const clientId = req.params.clientId;
            const commandes = await Commande.findAll({
                where: { client_id: clientId },
                include: [{
                    model: Client,
                    attributes: ['nom', 'prenom']
                }]
            });
            res.json(commandes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
        }
    });

    // Lister les commandes dans une période donnée
    app.get('/commandes', async (req, res) => {
        const { start, end } = req.query;

        
        if (!start || !end) {
            return res.status(400).json({ message: 'Les paramètres start et end sont requis' });
        }

        try {
            const commandes = await Commande.findAll({
                where: {
                    date_commande: {
                        [Op.between]: [new Date(start), new Date(end)] 
                    }
                }
            });
            res.json(commandes);
        } catch (err) {
            res.status(500).json({ message: 'Erreur lors de la récupération des commandes dans la période', error: err.message });
        }
    });

    // Lister les commandes d'un client spécifique
    app.get('/clients/:id/commandes', async (req, res) => {
        try {
            const commandes = await Commande.findAll({ where: { client_id: req.params.id } });
            if (commandes.length === 0) {
                return res.status(404).json({ message: 'Aucune commande trouvée pour ce client' });
            }
            res.json(commandes);
        } catch (err) {
            res.status(500).json({ message: 'Erreur lors de la récupération des commandes du client', error: err.message });
        }
    });

    // Lister les commandes contenant un produit précis
    app.get('/produits/:id/commandes', async (req, res) => {
        try {
            const commandes = await Commande.findAll({
                include: {
                    model: Ligne_Commande,
                    where: { produit_id: req.params.id },
                },
            });
            if (commandes.length === 0) {
                return res.status(404).json({ message: 'Aucune commande contenant ce produit trouvée' });
            }
            res.json(commandes);
        } catch (err) {
            res.status(500).json({ message: 'Erreur lors de la récupération des commandes contenant ce produit', error: err.message });
        }
    });


    app.get('/recherche-commandes', async (req, res) => {
        const { clientId, startDate, endDate, statut, produitId } = req.query;
    
        try {
            const [result] = await connection.query('CALL recherche_commandes(?, ?, ?, ?, ?)', [
                clientId || null,
                startDate || null,
                endDate || null,
                statut || null,
                produitId || null
            ]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la recherche des commandes', error: error.message });
        }
    });

    app.get('/statistiques-ventes', async (req, res) => {
        const { startDate, endDate } = req.query;
    
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Les paramètres startDate et endDate sont requis' });
        }
    
        try {
            const [result] = await connection.query('CALL statistiques_ventes(?, ?)', [startDate, endDate]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des statistiques de vente', error: error.message });
        }
    });

    app.post('/gestion-stock', async (req, res) => {
        const { clientId, produits } = req.body;
    
        if (!clientId || !produits || produits.length === 0) {
            return res.status(400).json({ message: 'Client et produits sont requis' });
        }
    
        try {
           
            const [result] = await connection.query('CALL gestion_stock(?, ?)', [clientId, JSON.stringify(produits)]);
            res.json({ message: 'Commande traitée avec succès', result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la gestion du stock', error: error.message });
        }
    });

    app.get('/produits/stock-faible', async (req, res) => {
        const { seuil } = req.query;
    
        if (!seuil) {
            return res.status(400).json({ message: 'Le paramètre seuil est requis' });
        }
    
        try {
            const [result] = await connection.query('CALL stock_faible(?)', [seuil]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits avec stock faible', error: error.message });
        }
    });

    // Gestion de la connexion
    app.post('/register', async (req, res) => {
        const { nom, email, password, role } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await Utilisateur.create({ nom, email, password: hash, role });
        res.status(201).json({ message: `Utilisateur ${user.nom} créé avec succès !` });
    });
        
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await Utilisateur.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    });
        
    // Exemple d'une route protégée accessible uniquement aux admins
    app.get('/admin/dashboard', verifyToken, isAdmin, (req, res) => {
        res.json({ message: 'Bienvenue sur le tableau de bord admin', user: req.user });
    })
        
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
});