const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Client = require('./client'); 

const Commande = sequelize.define('Commande', {
    date_commande: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    statut: { 
        type: DataTypes.ENUM('en attente', 'validée', 'expédiée', 'annulée'), 
        defaultValue: 'en attente' 
    }
}, {
    tableName: 'commandes',
    timestamps: false
});

// Définir la relation avec le client
Commande.belongsTo(Client, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

module.exports = Commande;
