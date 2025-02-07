const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Fournisseur = sequelize.define('Fournisseur', {
    nom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    contact: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    adresse: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, {
    tableName: 'fournisseurs',
    timestamps: false
});

module.exports = Fournisseur;
