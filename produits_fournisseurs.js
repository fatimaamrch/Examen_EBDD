const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Produit = require('./produit'); 
const Fournisseur = require('./fournisseur'); 

const ProduitFournisseur = sequelize.define('ProduitFournisseur', {
    prix_achat: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    delai_livraison: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    tableName: 'produits_fournisseurs',
    timestamps: false,
    primaryKey: false
});

// Définir les relations avec Produit et Fournisseur
ProduitFournisseur.belongsTo(Produit, { foreignKey: 'produit_id', onDelete: 'CASCADE' });
ProduitFournisseur.belongsTo(Fournisseur, { foreignKey: 'fournisseur_id', onDelete: 'CASCADE' });

module.exports = ProduitFournisseur;
