const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Categorie = require('./categories'); // Si tu as un modèle Categorie
const Produit = sequelize.define('Produit', {
    nom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    prix_unitaire: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    quantite_stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
    }
}, {
    tableName: 'produits',
    timestamps: false
});

// Définir la relation avec la catégorie
Produit.belongsTo(Categorie, {
    foreignKey: 'categorie_id',
    onDelete: 'CASCADE'
});

module.exports = Produit;
