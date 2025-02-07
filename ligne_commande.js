const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Commande = require('./commandes');
const Produit = require('./produit');

const LigneCommande = sequelize.define('LigneCommande', {
    quantite: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    prix_unitaire: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    }
}, {
    tableName: 'lignes_commande',
    timestamps: false
});

// Définir les relations avec Commande et Produit
LigneCommande.belongsTo(Commande, { foreignKey: 'commande_id', onDelete: 'CASCADE' });
LigneCommande.belongsTo(Produit, { foreignKey: 'produit_id', onDelete: 'CASCADE' });

module.exports = LigneCommande;
